import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const testimonial = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!testimonial) return notFound();
  return NextResponse.json({ testimonial });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  try {
    const body = await req.json();
    const { name, designation, company, image, content, rating, featured, sortOrder } = body;

    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        name: name?.trim() ?? existing.name,
        designation: designation?.trim() || null,
        company: company?.trim() || null,
        image: image?.trim() || null,
        content: content?.trim() ?? existing.content,
        rating: rating !== undefined ? Number(rating) : existing.rating,
        featured: featured !== undefined ? Boolean(featured) : existing.featured,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
      },
    });

    return NextResponse.json({ testimonial });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  await prisma.testimonial.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
