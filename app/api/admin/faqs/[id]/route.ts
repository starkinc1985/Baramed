import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const faq = await prisma.faq.findUnique({ where: { id: params.id } });
  if (!faq) return notFound();
  return NextResponse.json({ faq });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.faq.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  try {
    const body = await req.json();
    const { question, answer, category, sortOrder, published } = body;

    const faq = await prisma.faq.update({
      where: { id: params.id },
      data: {
        question: question?.trim() ?? existing.question,
        answer: answer?.trim() ?? existing.answer,
        category: category?.trim() || null,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
        published: published !== undefined ? Boolean(published) : existing.published,
      },
    });

    return NextResponse.json({ faq });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.faq.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  await prisma.faq.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
