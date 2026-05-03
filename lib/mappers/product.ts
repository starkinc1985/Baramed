import type { Product } from "@/types/product";
import { DEFAULT_COMPLIANCE } from "@/lib/staticCompliance";
import type { Prisma } from "@prisma/client";

export type PrismaProductForUi = Prisma.ProductGetPayload<{
  include: {
    images: true;
    specs: true;
    categories: { include: { category: { include: { parent: true } } } };
  };
}>;

export function mapPrismaProductToUiProduct(
  p: PrismaProductForUi,
): Product {
  const images = p.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => i.url);

  const specifications: Product["specifications"] = {};
  for (const spec of p.specs) {
    specifications[spec.key] = spec.value;
  }

  const linked = p.categories.map((pc) => pc.category);
  const instrumentRows = linked.filter((c) => c.type === "INSTRUMENT");
  const surgeryRows = linked.filter((c) => c.type === "SURGERY");

  const topInstrument = instrumentRows.find((c) => c.parentId === null);
  const subInstrument = instrumentRows.find((c) => c.parentId !== null);

  const topSurgery = surgeryRows
    .filter((c) => c.parentId === null)
    .map((c) => c.slug);

  return {
    id: p.id,
    name: p.name,
    productCode: p.productCode,
    description: p.description,
    shortDescription: p.shortDescription ?? undefined,
    images,
    category: topInstrument?.slug,
    subcategory: subInstrument?.slug,
    surgeryTypes: topSurgery,
    specifications,
    compliance: { ...DEFAULT_COMPLIANCE },
    featured: p.featured,
    inStock: p.inStock,
  };
}
