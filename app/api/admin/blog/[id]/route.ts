import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) return notFound();
  return NextResponse.json({ post });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, author, tags, published, publishedAt } = body;

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: {
        title: title?.trim() ?? existing.title,
        slug: slug?.trim().toLowerCase().replace(/\s+/g, "-") ?? existing.slug,
        excerpt: excerpt?.trim() || null,
        content: content?.trim() ?? existing.content,
        coverImage: coverImage?.trim() || null,
        author: author?.trim() || null,
        tags: Array.isArray(tags) ? tags.filter(Boolean) : existing.tags,
        published: published !== undefined ? Boolean(published) : existing.published,
        publishedAt:
          published && !existing.publishedAt
            ? publishedAt
              ? new Date(publishedAt)
              : new Date()
            : published && publishedAt
              ? new Date(publishedAt)
              : existing.publishedAt,
      },
    });

    return NextResponse.json({ post });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
