import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";
import { DownloadCategory } from "@prisma/client";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const downloads = await prisma.download.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return NextResponse.json({ downloads });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { title, description, category, fileSize, fileType, downloadUrl, published, sortOrder } = body;

    if (!title?.trim() || !downloadUrl?.trim()) {
      return NextResponse.json({ error: "title and downloadUrl are required" }, { status: 400 });
    }
    if (!Object.values(DownloadCategory).includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const download = await prisma.download.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        category: category as DownloadCategory,
        fileSize: fileSize?.trim() || null,
        fileType: fileType?.trim() || null,
        downloadUrl: downloadUrl.trim(),
        published: published !== false,
        sortOrder: Number(sortOrder) || 0,
      },
    });

    return NextResponse.json({ download }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
