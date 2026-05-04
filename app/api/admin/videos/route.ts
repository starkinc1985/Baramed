import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const videos = await prisma.video.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json({ videos });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { title, youtubeId, thumbnail, description, featured, sortOrder } = body;

    if (!title?.trim() || !youtubeId?.trim()) {
      return NextResponse.json({ error: "title and youtubeId are required" }, { status: 400 });
    }

    const video = await prisma.video.create({
      data: {
        title: title.trim(),
        youtubeId: youtubeId.trim(),
        thumbnail: thumbnail?.trim() || null,
        description: description?.trim() || null,
        featured: Boolean(featured),
        sortOrder: Number(sortOrder) || 0,
      },
    });

    return NextResponse.json({ video }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "YouTube ID already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
