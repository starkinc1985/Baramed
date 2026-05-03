import { prisma } from "@/lib/prisma";
import type { InstrumentTypeCategory, Product, SurgeryTypeCategory } from "@/types/product";
import { mapPrismaProductToUiProduct, type PrismaProductForUi } from "@/lib/mappers/product";

const productInclude = {
  images: { orderBy: { sortOrder: "asc" as const } },
  specs: { orderBy: { key: "asc" as const } },
  categories: { include: { category: { include: { parent: true } } } },
} as const;

async function mapParentWithChildren(
  type: "INSTRUMENT" | "SURGERY",
  parent: { id: string; name: string; slug: string; description: string | null },
): Promise<
  (InstrumentTypeCategory | SurgeryTypeCategory) & { id: string }
> {
  const children = await prisma.category.findMany({
    where: { type, parentId: parent.id },
    orderBy: { name: "asc" },
  });

  const subcategories = children.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  return {
    id: parent.id,
    name: parent.name,
    slug: parent.slug,
    description: parent.description ?? undefined,
    type: type === "INSTRUMENT" ? "instrument" : "surgery",
    subcategories,
  } as any;
}

export async function getInstrumentTypeCategoriesFromDb(): Promise<
  InstrumentTypeCategory[]
> {
  const parents = await prisma.category.findMany({
    where: { type: "INSTRUMENT", parentId: null },
    orderBy: { name: "asc" },
  });

  const out: InstrumentTypeCategory[] = [];
  for (const p of parents) {
    out.push((await mapParentWithChildren("INSTRUMENT", p)) as any);
  }
  return out;
}

export async function getSurgeryTypeCategoriesFromDb(): Promise<
  SurgeryTypeCategory[]
> {
  const parents = await prisma.category.findMany({
    where: { type: "SURGERY", parentId: null },
    orderBy: { name: "asc" },
  });

  const out: SurgeryTypeCategory[] = [];
  for (const p of parents) {
    out.push((await mapParentWithChildren("SURGERY", p)) as any);
  }
  return out;
}

export async function getFeaturedProductsFromDb(limit = 8): Promise<Product[]> {
  const rows: PrismaProductForUi[] = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { name: "asc" },
    take: limit,
    include: productInclude,
  });

  return rows.map(mapPrismaProductToUiProduct);
}

export async function getAllProductsForCatalogPage(): Promise<Product[]> {
  const rows: PrismaProductForUi[] = await prisma.product.findMany({
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    include: productInclude,
  });
  return rows.map(mapPrismaProductToUiProduct);
}

export async function getProductUiById(id: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where: { id },
    include: productInclude,
  });
  if (!row) return null;
  return mapPrismaProductToUiProduct(row);
}

export async function getProductsByInstrumentParentSlug(
  parentSlug: string,
): Promise<Product[]> {
  const parent = await prisma.category.findFirst({
    where: { type: "INSTRUMENT", slug: parentSlug, parentId: null },
  });
  if (!parent) return [];

  const rows: PrismaProductForUi[] = await prisma.product.findMany({
    where: {
      categories: {
        some: { categoryId: parent.id },
      },
    },
    orderBy: { name: "asc" },
    include: productInclude,
  });
  return rows.map(mapPrismaProductToUiProduct);
}

export async function getProductsByInstrumentParentAndSubSlug(
  parentSlug: string,
  subSlug: string,
): Promise<Product[]> {
  const parent = await prisma.category.findFirst({
    where: { type: "INSTRUMENT", slug: parentSlug, parentId: null },
  });
  const sub = await prisma.category.findFirst({
    where: { type: "INSTRUMENT", slug: subSlug, parentId: parent?.id },
  });
  if (!parent || !sub) return [];

  const rows: PrismaProductForUi[] = await prisma.product.findMany({
    where: {
      AND: [
        { categories: { some: { categoryId: parent.id } } },
        { categories: { some: { categoryId: sub.id } } },
      ],
    },
    orderBy: { name: "asc" },
    include: productInclude,
  });
  return rows.map(mapPrismaProductToUiProduct);
}

export async function getProductsBySurgeryParentSlug(
  surgerySlug: string,
): Promise<Product[]> {
  const parent = await prisma.category.findFirst({
    where: { type: "SURGERY", slug: surgerySlug, parentId: null },
  });
  if (!parent) return [];

  const rows: PrismaProductForUi[] = await prisma.product.findMany({
    where: {
      categories: {
        some: { categoryId: parent.id },
      },
    },
    orderBy: { name: "asc" },
    include: productInclude,
  });
  return rows.map(mapPrismaProductToUiProduct);
}

export async function getRelatedProducts(
  productId: string,
  instrumentParentSlug: string,
  take = 4,
): Promise<Product[]> {
  const parent = await prisma.category.findFirst({
    where: { type: "INSTRUMENT", slug: instrumentParentSlug, parentId: null },
  });
  if (!parent) return [];

  const rows: PrismaProductForUi[] = await prisma.product.findMany({
    where: {
      id: { not: productId },
      categories: { some: { categoryId: parent.id } },
    },
    take,
    orderBy: { name: "asc" },
    include: productInclude,
  });
  return rows.map(mapPrismaProductToUiProduct);
}

export async function getStaticInstrumentSlugs(): Promise<{ slug: string }[]> {
  const parents = await prisma.category.findMany({
    where: { type: "INSTRUMENT", parentId: null },
    select: { slug: true },
  });
  return parents.map((p) => ({ slug: p.slug }));
}

export async function getStaticSurgerySlugs(): Promise<{ slug: string }[]> {
  const parents = await prisma.category.findMany({
    where: { type: "SURGERY", parentId: null },
    select: { slug: true },
  });
  return parents.map((p) => ({ slug: p.slug }));
}

export async function getStaticInstrumentSubslugs(): Promise<
  { slug: string; subslug: string }[]
> {
  const parents = await prisma.category.findMany({
    where: { type: "INSTRUMENT", parentId: null },
    select: { id: true, slug: true },
  });
  const out: { slug: string; subslug: string }[] = [];
  for (const p of parents) {
    const subs = await prisma.category.findMany({
      where: { type: "INSTRUMENT", parentId: p.id },
      select: { slug: true },
    });
    for (const s of subs) out.push({ slug: p.slug, subslug: s.slug });
  }
  return out;
}

export async function findInstrumentCategoryBySlug(
  parentSlug: string,
): Promise<InstrumentTypeCategory | null> {
  const parent = await prisma.category.findFirst({
    where: { type: "INSTRUMENT", slug: parentSlug, parentId: null },
  });
  if (!parent) return null;
  return (await mapParentWithChildren("INSTRUMENT", parent)) as any;
}

export async function findSurgeryCategoryBySlug(
  parentSlug: string,
): Promise<SurgeryTypeCategory | null> {
  const parent = await prisma.category.findFirst({
    where: { type: "SURGERY", slug: parentSlug, parentId: null },
  });
  if (!parent) return null;
  return (await mapParentWithChildren("SURGERY", parent)) as any;
}
