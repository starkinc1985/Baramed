import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const categories = await Category.find().sort({ type: 1, parentId: 1, name: 1 }).lean();
  const withCounts = await Promise.all(categories.map(async (c: any) => {
    const [childCount, productCount] = await Promise.all([
      Category.countDocuments({ parentId: c._id }),
      Product.countDocuments({ categoryIds: c._id }),
    ]);
    return { ...c, id: c._id.toString(), _count: { children: childCount, products: productCount } };
  }));
  return NextResponse.json({ categories: withCounts });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  try {
    const body = await req.json();
    const { type, name, slug, description, parentId } = body;
    if (!type || !name?.trim() || !slug?.trim()) return NextResponse.json({ error: "type, name, and slug are required" }, { status: 400 });
    if (!["INSTRUMENT", "SURGERY"].includes(type)) return NextResponse.json({ error: "type must be INSTRUMENT or SURGERY" }, { status: 400 });
    const category = await Category.create({
      type, name: name.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      description: description?.trim() || undefined,
      parentId: parentId || null,
    });
    return NextResponse.json({ category }, { status: 201 });
  } catch (e: any) {
    if (e.code === 11000) return NextResponse.json({ error: "Slug already in use for this category type" }, { status: 409 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
