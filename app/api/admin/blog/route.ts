import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).select("title slug published author publishedAt createdAt").lean();
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, author, tags, published, publishedAt } = body;
    if (!title?.trim() || !slug?.trim() || !content?.trim()) return NextResponse.json({ error: "title, slug, and content are required" }, { status: 400 });
    const post = await BlogPost.create({
      title: title.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      excerpt: excerpt?.trim() || undefined,
      content: content.trim(),
      coverImage: coverImage?.trim() || undefined,
      author: author?.trim() || undefined,
      tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
      published: Boolean(published),
      publishedAt: published && publishedAt ? new Date(publishedAt) : published ? new Date() : undefined,
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (e: any) {
    if (e.code === 11000) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
