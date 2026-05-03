import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { CategoryType } from "@prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryType = url.searchParams.get("categoryType"); // INSTRUMENT|SURGERY
  const categorySlug = url.searchParams.get("categorySlug");
  const q = url.searchParams.get("q");
  const featured = url.searchParams.get("featured");
  const takeRaw = url.searchParams.get("take");
  const take = takeRaw ? Number(takeRaw) : undefined;

  const where: any = {};

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { productCode: { contains: q, mode: "insensitive" } },
    ];
  }

  if (featured === "true" || featured === "1") {
    where.featured = true;
  }

  if (categorySlug && (categoryType === "INSTRUMENT" || categoryType === "SURGERY")) {
    where.categories = {
      some: {
        category: {
          type:
            categoryType === "INSTRUMENT"
              ? CategoryType.INSTRUMENT
              : CategoryType.SURGERY,
          slug: categorySlug,
        },
      },
    };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    take: Number.isFinite(take) && take! > 0 ? take : undefined,
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
      categories: { include: { category: { include: { parent: true } } } },
    },
  });

  return NextResponse.json({ products });
}

