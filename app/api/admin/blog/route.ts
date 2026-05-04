import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, published: true, author: true, publishedAt: true, createdAt: true },
  });

  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, author, tags, published, publishedAt } = body;

    if (!title?.trim() || !slug?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "title, slug, and content are required" }, { status: 400 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        excerpt: excerpt?.trim() || null,
        content: content.trim(),
        coverImage: coverImage?.trim() || null,
        author: author?.trim() || null,
        tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
        published: Boolean(published),
        publishedAt: published && publishedAt ? new Date(publishedAt) : published ? new Date() : null,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
