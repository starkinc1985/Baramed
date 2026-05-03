import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sampleProducts } from "@/data/products";
import {
  instrumentTypeCategories,
  surgeryTypeCategories,
} from "@/data/categories";

type AnyCategory = {
  name: string;
  slug: string;
  description?: string;
  subcategories?: { name: string; slug: string; description?: string }[];
};

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  // Clear in safe order
  await prisma.inquiryAttachment.deleteMany();
  await prisma.inquiryItem.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productSpec.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categories (parents + children)
  async function createCategoryTree(
    type: "INSTRUMENT" | "SURGERY",
    cats: AnyCategory[],
  ) {
    for (const c of cats) {
      const parent = await prisma.category.create({
        data: {
          type,
          name: c.name,
          slug: c.slug,
          description: c.description ?? null,
        },
      });

      if (Array.isArray(c.subcategories)) {
        for (const s of c.subcategories) {
          await prisma.category.create({
            data: {
              type,
              name: s.name,
              slug: s.slug,
              description: s.description ?? null,
              parentId: parent.id,
            },
          });
        }
      }
    }
  }

  await createCategoryTree(
    "INSTRUMENT",
    instrumentTypeCategories as unknown as AnyCategory[],
  );
  await createCategoryTree(
    "SURGERY",
    surgeryTypeCategories as unknown as AnyCategory[],
  );

  const categories = await prisma.category.findMany();
  const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  // Products
  for (const p of sampleProducts as any[]) {
    const created = await prisma.product.create({
      data: {
        name: p.name,
        productCode: p.productCode,
        shortDescription: p.shortDescription ?? null,
        description: p.description,
        featured: !!p.featured,
        inStock: p.inStock !== false,
        images: {
          create: (p.images ?? []).map((url: string, idx: number) => ({
            url,
            sortOrder: idx,
          })),
        },
        specs: {
          create: Object.entries(p.specifications ?? {}).map(([key, value]) => ({
            key,
            value: String(value),
          })),
        },
      },
    });

    const slugs = new Set<string>();
    if (typeof p.category === "string") slugs.add(p.category);
    if (typeof p.subcategory === "string") slugs.add(p.subcategory);
    if (Array.isArray(p.surgeryTypes)) {
      for (const st of p.surgeryTypes) if (typeof st === "string") slugs.add(st);
    }

    for (const slug of slugs) {
      const categoryId = categoryIdBySlug.get(slug);
      if (!categoryId) continue;
      await prisma.productCategory.create({
        data: { productId: created.id, categoryId },
      });
    }
  }

  return NextResponse.json({
    ok: true,
    categories: await prisma.category.count(),
    products: await prisma.product.count(),
  });
}

