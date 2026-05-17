import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models/Faq";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const faqs = await Faq.find().sort({ sortOrder: 1, createdAt: 1 }).lean();
  return NextResponse.json({ faqs });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  try {
    const body = await req.json();
    const { question, answer, category, sortOrder, published } = body;
    if (!question?.trim() || !answer?.trim()) return NextResponse.json({ error: "question and answer are required" }, { status: 400 });
    const faq = await Faq.create({ question: question.trim(), answer: answer.trim(), category: category?.trim(), sortOrder: Number(sortOrder) || 0, published: published !== false });
    return NextResponse.json({ faq }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
