import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";
import { InquiryStatus } from "@prisma/client";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: params.id },
    include: { items: true, attachments: true },
  });
  if (!inquiry) return notFound();
  return NextResponse.json({ inquiry });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.inquiry.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  try {
    const body = await req.json();
    const { status } = body;

    if (status && !Object.values(InquiryStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: { status: status ?? existing.status },
    });

    return NextResponse.json({ inquiry });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.inquiry.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  await prisma.inquiry.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
