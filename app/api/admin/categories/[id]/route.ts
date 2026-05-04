import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const category = await prisma.category.findUnique({
    where: { id: params.id },
    include: { parent: true, children: true },
  });
  if (!category) return notFound();
  return NextResponse.json({ category });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.category.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  try {
    const body = await req.json();
    const { name, slug, description, parentId } = body;

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: name?.trim() ?? existing.name,
        slug: slug?.trim().toLowerCase().replace(/\s+/g, "-") ?? existing.slug,
        description: description?.trim() || null,
        parentId: parentId !== undefined ? parentId || null : existing.parentId,
      },
    });

    return NextResponse.json({ category });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "Slug already in use for this category type" }, { status: 409 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.category.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  await prisma.category.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
