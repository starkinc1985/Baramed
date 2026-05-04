import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const testimonials = await prisma.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json({ testimonials });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { name, designation, company, image, content, rating, featured, sortOrder } = body;

    if (!name?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "name and content are required" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        designation: designation?.trim() || null,
        company: company?.trim() || null,
        image: image?.trim() || null,
        content: content.trim(),
        rating: Number(rating) || 5,
        featured: Boolean(featured),
        sortOrder: Number(sortOrder) || 0,
      },
    });

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
