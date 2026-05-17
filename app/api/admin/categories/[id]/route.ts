import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const category = await Category.findById(params.id).lean();
  if (!category) return notFound();
  const children = await Category.find({ parentId: (category as any)._id }).lean();
  const parent = (category as any).parentId ? await Category.findById((category as any).parentId).lean() : null;
  return NextResponse.json({ category: { ...(category as any), id: (category as any)._id.toString(), parent, children } });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const existing = await Category.findById(params.id);
  if (!existing) return notFound();
  try {
    const body = await req.json();
    const { name, slug, description, parentId } = body;
    if (name?.trim()) existing.name = name.trim();
    if (slug?.trim()) existing.slug = slug.trim().toLowerCase().replace(/\s+/g, "-");
    existing.description = description?.trim() || undefined;
    if (parentId !== undefined) (existing as any).parentId = parentId || null;
    await existing.save();
    return NextResponse.json({ category: existing.toJSON() });
  } catch (e: any) {
    if (e.code === 11000) return NextResponse.json({ error: "Slug already in use for this category type" }, { status: 409 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const deleted = await Category.findByIdAndDelete(params.id);
  if (!deleted) return notFound();
  return NextResponse.json({ ok: true });
}
