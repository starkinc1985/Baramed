import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const url = new URL(req.url);
  const skip = Math.max(0, parseInt(url.searchParams.get("skip") ?? "0") || 0);
  const limit = Math.min(Math.max(1, parseInt(url.searchParams.get("limit") ?? "20") || 20), 100);
  const q = url.searchParams.get("q")?.trim() ?? "";

  await connectDB();

  const filter = q
    ? { $or: [{ name: { $regex: q, $options: "i" } }, { productCode: { $regex: q, $options: "i" } }] }
    : {};

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .select("name productCode images featured inStock categoryIds")
      .sort({ featured: -1, name: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
  ]);

  // Batch fetch all referenced categories in one query (avoids N+1)
  const allCatIds = [
    ...new Set(products.flatMap((p: any) => (p.categoryIds ?? []).map((id: any) => id.toString()))),
  ];
  const categories = allCatIds.length > 0
    ? await Category.find({ _id: { $in: allCatIds } }).select("_id name parentId").lean()
    : [];
  const catMap = new Map(categories.map((c: any) => [c._id.toString(), c]));

  const rows = (products as any[]).map((p) => {
    const cats = (p.categoryIds ?? []).map((id: any) => catMap.get(id.toString())).filter(Boolean);
    const topCatName = (cats as any[]).find((c: any) => !c.parentId)?.name ?? null;
    return {
      id: p._id.toString(),
      name: p.name,
      productCode: p.productCode,
      thumb: (p.images as any[])?.[0]?.url ?? null,
      featured: p.featured,
      inStock: p.inStock,
      topCatName,
    };
  });

  return NextResponse.json({ products: rows, total });
}

export async function DELETE() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const result = await Product.deleteMany({});
  return NextResponse.json({ deleted: result.deletedCount });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  try {
    const body = await req.json();
    const { name, productCode, description, shortDescription, featured, inStock, imageUrls, specs, variations, categoryIds } = body;
    if (!name?.trim() || !productCode?.trim() || !description?.trim()) {
      return NextResponse.json({ error: "name, productCode, and description are required" }, { status: 400 });
    }
    const product = await Product.create({
      name: name.trim(),
      productCode: productCode.trim(),
      description: description.trim(),
      shortDescription: shortDescription?.trim() || undefined,
      featured: Boolean(featured),
      inStock: inStock !== false,
      images: (imageUrls || []).map((url: string, i: number) => ({ url, sortOrder: i })),
      specs: (specs || []).filter((s: any) => s.key?.trim() && s.value?.trim()).map((s: any) => ({ key: s.key.trim(), value: s.value.trim() })),
      variations: (variations || []).filter((v: any) => v.name?.trim()).map((v: any) => ({ name: v.name.trim(), catalogNumber: v.catalogNumber?.trim() || undefined })),
      categoryIds: (categoryIds || []).filter((id: string) => mongoose.isValidObjectId(id)).map((id: string) => new mongoose.Types.ObjectId(id)),
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (e: any) {
    if (e.code === 11000) return NextResponse.json({ error: "Product code already in use" }, { status: 409 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
