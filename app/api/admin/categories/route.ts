import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const categories = await prisma.category.findMany({
    orderBy: [{ type: "asc" }, { parentId: "asc" }, { name: "asc" }],
    include: { parent: true, _count: { select: { children: true, products: true } } },
  });

  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { type, name, slug, description, parentId } = body;

    if (!type || !name?.trim() || !slug?.trim()) {
      return NextResponse.json({ error: "type, name, and slug are required" }, { status: 400 });
    }
    if (!["INSTRUMENT", "SURGERY"].includes(type)) {
      return NextResponse.json({ error: "type must be INSTRUMENT or SURGERY" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        type,
        name: name.trim(),
        slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
        description: description?.trim() || null,
        parentId: parentId || null,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "Slug already in use for this category type" }, { status: 409 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
