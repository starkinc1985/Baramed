import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const products = await prisma.product.findMany({
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      categories: { include: { category: true } },
    },
  });

  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  try {
    const body = await req.json();
    const { name, productCode, description, shortDescription, featured, inStock, imageUrls, specs, categoryIds } = body;

    if (!name?.trim() || !productCode?.trim() || !description?.trim()) {
      return NextResponse.json({ error: "name, productCode, and description are required" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        productCode: productCode.trim(),
        description: description.trim(),
        shortDescription: shortDescription?.trim() || null,
        featured: Boolean(featured),
        inStock: inStock !== false,
        images: {
          create: (imageUrls || []).map((url: string, i: number) => ({ url, sortOrder: i })),
        },
        specs: {
          create: (specs || [])
            .filter((s: { key: string; value: string }) => s.key?.trim() && s.value?.trim())
            .map((s: { key: string; value: string }) => ({ key: s.key.trim(), value: s.value.trim() })),
        },
        categories: {
          create: (categoryIds || []).map((categoryId: string) => ({ categoryId })),
        },
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "Product code already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
