import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mapMongoProductToUiProduct } from "@/lib/mappers/product";
import type { InstrumentTypeCategory, Product as UiProduct, SurgeryTypeCategory } from "@/types/product";
import mongoose from "mongoose";

async function getCats(ids: mongoose.Types.ObjectId[]) {
  if (!ids?.length) return [];
  return Category.find({ _id: { $in: ids } }).lean() as any;
}

async function buildTree(type: "INSTRUMENT" | "SURGERY", parent: any) {
  const children = await Category.find({ type, parentId: parent._id }).sort({ name: 1 }).lean() as any[];
  return {
    id: parent._id.toString(), name: parent.name, slug: parent.slug,
    description: parent.description,
    type: type === "INSTRUMENT" ? "instrument" : "surgery",
    subcategories: children.map((c: any) => ({ id: c._id.toString(), name: c.name, slug: c.slug })),
  };
}

export async function getInstrumentTypeCategoriesFromDb(): Promise<InstrumentTypeCategory[]> {
  await connectDB();
  const parents = await Category.find({ type: "INSTRUMENT", parentId: null }).sort({ name: 1 }).lean();
  return Promise.all(parents.map((p) => buildTree("INSTRUMENT", p))) as any;
}

export async function getSurgeryTypeCategoriesFromDb(): Promise<SurgeryTypeCategory[]> {
  await connectDB();
  const parents = await Category.find({ type: "SURGERY", parentId: null }).sort({ name: 1 }).lean();
  return Promise.all(parents.map((p) => buildTree("SURGERY", p))) as any;
}

export async function getFeaturedProductsFromDb(limit = 8): Promise<UiProduct[]> {
  await connectDB();
  const ps = await Product.find({ featured: true }).sort({ name: 1 }).limit(limit).lean();
  return Promise.all(ps.map(async (p: any) => mapMongoProductToUiProduct(p, await getCats(p.categoryIds))));
}

export async function getAllProductsForCatalogPage(): Promise<UiProduct[]> {
  await connectDB();
  const ps = await Product.find().sort({ featured: -1, name: 1 }).lean();
  return Promise.all(ps.map(async (p: any) => mapMongoProductToUiProduct(p, await getCats(p.categoryIds))));
}

export async function getProductUiById(id: string): Promise<UiProduct | null> {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  const p = await Product.findById(id).lean();
  if (!p) return null;
  return mapMongoProductToUiProduct(p, await getCats((p as any).categoryIds));
}

export async function getProductsByInstrumentParentSlug(parentSlug: string): Promise<UiProduct[]> {
  await connectDB();
  const parent = await Category.findOne({ type: "INSTRUMENT", slug: parentSlug, parentId: null }).lean();
  if (!parent) return [];
  const ps = await Product.find({ categoryIds: (parent as any)._id }).sort({ name: 1 }).lean();
  return Promise.all(ps.map(async (p: any) => mapMongoProductToUiProduct(p, await getCats(p.categoryIds))));
}

export async function getProductsByInstrumentParentAndSubSlug(parentSlug: string, subSlug: string): Promise<UiProduct[]> {
  await connectDB();
  const parent = await Category.findOne({ type: "INSTRUMENT", slug: parentSlug, parentId: null }).lean();
  const sub = parent ? await Category.findOne({ type: "INSTRUMENT", slug: subSlug, parentId: (parent as any)._id }).lean() : null;
  if (!parent || !sub) return [];
  const ps = await Product.find({ categoryIds: { $all: [(parent as any)._id, (sub as any)._id] } }).sort({ name: 1 }).lean();
  return Promise.all(ps.map(async (p: any) => mapMongoProductToUiProduct(p, await getCats(p.categoryIds))));
}

export async function getProductsBySurgeryParentSlug(surgerySlug: string): Promise<UiProduct[]> {
  await connectDB();
  const parent = await Category.findOne({ type: "SURGERY", slug: surgerySlug, parentId: null }).lean();
  if (!parent) return [];
  const ps = await Product.find({ categoryIds: (parent as any)._id }).sort({ name: 1 }).lean();
  return Promise.all(ps.map(async (p: any) => mapMongoProductToUiProduct(p, await getCats(p.categoryIds))));
}

export async function getRelatedProducts(productId: string, instrumentParentSlug: string, take = 4): Promise<UiProduct[]> {
  await connectDB();
  if (!mongoose.isValidObjectId(productId)) return [];
  const parent = await Category.findOne({ type: "INSTRUMENT", slug: instrumentParentSlug, parentId: null }).lean();
  if (!parent) return [];
  const ps = await Product.find({ _id: { $ne: productId }, categoryIds: (parent as any)._id }).sort({ name: 1 }).limit(take).lean();
  return Promise.all(ps.map(async (p: any) => mapMongoProductToUiProduct(p, await getCats(p.categoryIds))));
}

export async function getStaticInstrumentSlugs(): Promise<{ slug: string }[]> {
  await connectDB();
  return (await Category.find({ type: "INSTRUMENT", parentId: null }).select("slug").lean() as any[]).map((p) => ({ slug: p.slug }));
}

export async function getStaticSurgerySlugs(): Promise<{ slug: string }[]> {
  await connectDB();
  return (await Category.find({ type: "SURGERY", parentId: null }).select("slug").lean() as any[]).map((p) => ({ slug: p.slug }));
}

export async function getStaticInstrumentSubslugs(): Promise<{ slug: string; subslug: string }[]> {
  await connectDB();
  const parents = await Category.find({ type: "INSTRUMENT", parentId: null }).select("_id slug").lean() as any[];
  const out: { slug: string; subslug: string }[] = [];
  for (const p of parents) {
    const subs = await Category.find({ type: "INSTRUMENT", parentId: p._id }).select("slug").lean() as any[];
    for (const s of subs) out.push({ slug: p.slug, subslug: s.slug });
  }
  return out;
}

export async function findInstrumentCategoryBySlug(parentSlug: string): Promise<InstrumentTypeCategory | null> {
  await connectDB();
  const parent = await Category.findOne({ type: "INSTRUMENT", slug: parentSlug, parentId: null }).lean();
  if (!parent) return null;
  return buildTree("INSTRUMENT", parent) as any;
}

export async function findSurgeryCategoryBySlug(parentSlug: string): Promise<SurgeryTypeCategory | null> {
  await connectDB();
  const parent = await Category.findOne({ type: "SURGERY", slug: parentSlug, parentId: null }).lean();
  if (!parent) return null;
  return buildTree("SURGERY", parent) as any;
}
