import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const video = await prisma.video.findUnique({ where: { id: params.id } });
  if (!video) return notFound();
  return NextResponse.json({ video });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.video.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  try {
    const body = await req.json();
    const { title, youtubeId, thumbnail, description, featured, sortOrder } = body;

    const video = await prisma.video.update({
      where: { id: params.id },
      data: {
        title: title?.trim() ?? existing.title,
        youtubeId: youtubeId?.trim() ?? existing.youtubeId,
        thumbnail: thumbnail?.trim() || null,
        description: description?.trim() || null,
        featured: featured !== undefined ? Boolean(featured) : existing.featured,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
      },
    });

    return NextResponse.json({ video });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "YouTube ID already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.video.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  await prisma.video.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
