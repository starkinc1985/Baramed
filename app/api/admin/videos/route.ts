import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Video } from "@/models/Video";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const videos = await Video.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json({ videos });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  try {
    const body = await req.json();
    const { title, youtubeId, thumbnail, description, featured, sortOrder } = body;
    if (!title?.trim() || !youtubeId?.trim()) return NextResponse.json({ error: "title and youtubeId are required" }, { status: 400 });
    const video = await Video.create({ title: title.trim(), youtubeId: youtubeId.trim(), thumbnail: thumbnail?.trim(), description: description?.trim(), featured: Boolean(featured), sortOrder: Number(sortOrder) || 0 });
    return NextResponse.json({ video }, { status: 201 });
  } catch (e: any) {
    if (e.code === 11000) return NextResponse.json({ error: "YouTube ID already in use" }, { status: 409 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
