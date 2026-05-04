import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";
import { DownloadCategory } from "@prisma/client";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const download = await prisma.download.findUnique({ where: { id: params.id } });
  if (!download) return notFound();
  return NextResponse.json({ download });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.download.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  try {
    const body = await req.json();
    const { title, description, category, fileSize, fileType, downloadUrl, published, sortOrder } = body;

    const download = await prisma.download.update({
      where: { id: params.id },
      data: {
        title: title?.trim() ?? existing.title,
        description: description?.trim() || null,
        category: (category as DownloadCategory) ?? existing.category,
        fileSize: fileSize?.trim() || null,
        fileType: fileType?.trim() || null,
        downloadUrl: downloadUrl?.trim() ?? existing.downloadUrl,
        published: published !== undefined ? Boolean(published) : existing.published,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
      },
    });

    return NextResponse.json({ download });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.download.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  await prisma.download.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
