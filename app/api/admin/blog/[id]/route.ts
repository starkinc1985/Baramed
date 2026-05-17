import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const post = await BlogPost.findById(params.id).lean();
  if (!post) return notFound();
  return NextResponse.json({ post });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const existing = await BlogPost.findById(params.id);
  if (!existing) return notFound();
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, author, tags, published, publishedAt } = body;
    if (title?.trim()) existing.title = title.trim();
    if (slug?.trim()) existing.slug = slug.trim().toLowerCase().replace(/\s+/g, "-");
    if (excerpt !== undefined) existing.excerpt = excerpt?.trim() || undefined;
    if (content?.trim()) existing.content = content.trim();
    if (coverImage !== undefined) existing.coverImage = coverImage?.trim() || undefined;
    if (author !== undefined) existing.author = author?.trim() || undefined;
    if (Array.isArray(tags)) existing.tags = tags.filter(Boolean);
    if (published !== undefined) {
      existing.published = Boolean(published);
      existing.publishedAt = published && publishedAt ? new Date(publishedAt) : published && !existing.publishedAt ? new Date() : existing.publishedAt;
    }
    await existing.save();
    return NextResponse.json({ post: existing.toJSON() });
  } catch (e: any) {
    if (e.code === 11000) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const deleted = await BlogPost.findByIdAndDelete(params.id);
  if (!deleted) return notFound();
  return NextResponse.json({ ok: true });
}
