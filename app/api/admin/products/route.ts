import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const products = await Product.find().sort({ featured: -1, name: 1 }).lean();
  const withCats = await Promise.all(products.map(async (p: any) => {
    const cats = p.categoryIds?.length
      ? await Category.find({ _id: { $in: p.categoryIds } }).lean()
      : [];
    return { ...p, id: p._id.toString(), categories: cats };
  }));
  return NextResponse.json({ products: withCats });
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
