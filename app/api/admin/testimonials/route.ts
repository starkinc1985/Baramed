import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const testimonials = await Testimonial.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json({ testimonials });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  try {
    const body = await req.json();
    const { name, designation, company, image, content, rating, featured, sortOrder } = body;
    if (!name?.trim() || !content?.trim()) return NextResponse.json({ error: "name and content are required" }, { status: 400 });
    const testimonial = await Testimonial.create({ name: name.trim(), designation: designation?.trim(), company: company?.trim(), image: image?.trim(), content: content.trim(), rating: Number(rating) || 5, featured: Boolean(featured), sortOrder: Number(sortOrder) || 0 });
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
