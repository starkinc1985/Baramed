import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const product = await Product.findById(params.id).lean();
  if (!product) return notFound();
  const cats = (product as any).categoryIds?.length
    ? await Category.find({ _id: { $in: (product as any).categoryIds } }).lean()
    : [];
  return NextResponse.json({ product: { ...(product as any), id: (product as any)._id.toString(), categories: cats } });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const existing = await Product.findById(params.id);
  if (!existing) return notFound();
  try {
    const body = await req.json();
    const { name, productCode, description, shortDescription, featured, inStock, imageUrls, specs, variations, categoryIds } = body;
    existing.name = name?.trim() ?? existing.name;
    existing.productCode = productCode?.trim() ?? existing.productCode;
    existing.description = description?.trim() ?? existing.description;
    existing.shortDescription = shortDescription?.trim() || undefined;
    existing.featured = featured !== undefined ? Boolean(featured) : existing.featured;
    existing.inStock = inStock !== undefined ? Boolean(inStock) : existing.inStock;
    if (imageUrls !== undefined) existing.images = imageUrls.map((url: string, i: number) => ({ url, sortOrder: i }));
    if (specs !== undefined) existing.specs = specs.filter((s: any) => s.key?.trim() && s.value?.trim()).map((s: any) => ({ key: s.key.trim(), value: s.value.trim() }));
    if (variations !== undefined) existing.variations = variations.filter((v: any) => v.name?.trim()).map((v: any) => ({ name: v.name.trim(), catalogNumber: v.catalogNumber?.trim() || undefined }));
    if (categoryIds !== undefined) existing.categoryIds = categoryIds.filter((id: string) => mongoose.isValidObjectId(id)).map((id: string) => new mongoose.Types.ObjectId(id));
    await existing.save();
    return NextResponse.json({ product: existing.toJSON() });
  } catch (e: any) {
    if (e.code === 11000) return NextResponse.json({ error: "Product code already in use" }, { status: 409 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const deleted = await Product.findByIdAndDelete(params.id);
  if (!deleted) return notFound();
  return NextResponse.json({ ok: true });
}
