import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const faqs = await prisma.faq.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json({ faqs });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { question, answer, category, sortOrder, published } = body;

    if (!question?.trim() || !answer?.trim()) {
      return NextResponse.json({ error: "question and answer are required" }, { status: 400 });
    }

    const faq = await prisma.faq.create({
      data: {
        question: question.trim(),
        answer: answer.trim(),
        category: category?.trim() || null,
        sortOrder: Number(sortOrder) || 0,
        published: published !== false,
      },
    });

    return NextResponse.json({ faq }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
