import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;

  const inquiries = await prisma.inquiry.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });

  return NextResponse.json({ inquiries });
}
