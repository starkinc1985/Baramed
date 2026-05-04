import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      specs: true,
      categories: { include: { category: true } },
    },
  });
  if (!product) return notFound();
  return NextResponse.json({ product });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.product.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  try {
    const body = await req.json();
    const { name, productCode, description, shortDescription, featured, inStock, imageUrls, specs, categoryIds } = body;

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id: params.id },
        data: {
          name: name?.trim() ?? existing.name,
          productCode: productCode?.trim() ?? existing.productCode,
          description: description?.trim() ?? existing.description,
          shortDescription: shortDescription?.trim() || null,
          featured: featured !== undefined ? Boolean(featured) : existing.featured,
          inStock: inStock !== undefined ? Boolean(inStock) : existing.inStock,
        },
      });

      await tx.productImage.deleteMany({ where: { productId: params.id } });
      if (imageUrls?.length) {
        await tx.productImage.createMany({
          data: (imageUrls as string[]).map((url, i) => ({ productId: params.id, url, sortOrder: i })),
        });
      }

      await tx.productSpec.deleteMany({ where: { productId: params.id } });
      if (specs?.length) {
        await tx.productSpec.createMany({
          data: (specs as { key: string; value: string }[])
            .filter((s) => s.key?.trim() && s.value?.trim())
            .map((s) => ({ productId: params.id, key: s.key.trim(), value: s.value.trim() })),
        });
      }

      await tx.productCategory.deleteMany({ where: { productId: params.id } });
      if (categoryIds?.length) {
        await tx.productCategory.createMany({
          data: (categoryIds as string[]).map((categoryId) => ({ productId: params.id, categoryId })),
        });
      }
    });

    const updated = await prisma.product.findUnique({
      where: { id: params.id },
      include: { images: { orderBy: { sortOrder: "asc" } }, specs: true, categories: { include: { category: true } } },
    });
    return NextResponse.json({ product: updated });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "Product code already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const existing = await prisma.product.findUnique({ where: { id: params.id } });
  if (!existing) return notFound();

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
