import type { Product } from "@/types/product";
import { DEFAULT_COMPLIANCE } from "@/lib/staticCompliance";
import type { IProduct } from "@/models/Product";
import type { ICategory } from "@/models/Category";

export type MongoProductForUi = IProduct & {
  _categories?: ICategory[];
};

export function mapMongoProductToUiProduct(
  p: any,
  categories: ICategory[] = [],
): Product {
  const images = (p.images ?? [])
    .slice()
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
    .map((i: any) => i.url);

  const specifications: Product["specifications"] = {};
  for (const spec of p.specs ?? []) {
    specifications[spec.key] = spec.value;
  }

  const instrumentRows = categories.filter((c) => c.type === "INSTRUMENT");
  const surgeryRows = categories.filter((c) => c.type === "SURGERY");

  const topInstrument = instrumentRows.find((c) => !c.parentId);
  const subInstrument = instrumentRows.find((c) => c.parentId);
  const topSurgery = surgeryRows.filter((c) => !c.parentId).map((c) => c.slug);

  const variations = (p.variations ?? []).map((v: any) => ({
    id: v._id?.toString() ?? v.id ?? v.name,
    name: v.name,
    catalogNumber: v.catalogNumber ?? undefined,
  }));

  return {
    id: p._id?.toString() ?? p.id,
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
    variations,
    featured: p.featured,
    inStock: p.inStock,
  };
}
