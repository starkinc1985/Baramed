import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Download } from "@/models/Download";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const downloads = await Download.find().sort({ sortOrder: 1, createdAt: -1 }).lean();
  return NextResponse.json({ downloads });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  try {
    const body = await req.json();
    const { title, description, category, fileSize, fileType, downloadUrl, published, sortOrder } = body;
    if (!title?.trim() || !downloadUrl?.trim()) return NextResponse.json({ error: "title and downloadUrl are required" }, { status: 400 });
    const download = await Download.create({ title: title.trim(), description: description?.trim(), category: category || "OTHER", fileSize: fileSize?.trim(), fileType: fileType?.trim(), downloadUrl: downloadUrl.trim(), published: published !== false, sortOrder: Number(sortOrder) || 0 });
    return NextResponse.json({ download }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
