import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mapMongoProductToUiProduct } from "@/lib/mappers/product";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const categoryType = url.searchParams.get("categoryType");
  const categorySlug = url.searchParams.get("categorySlug");
  const q = url.searchParams.get("q");
  const featured = url.searchParams.get("featured");
  const takeRaw = url.searchParams.get("take");
  const take = takeRaw ? Number(takeRaw) : undefined;

  await connectDB();

  const filter: any = {};

  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { productCode: { $regex: q, $options: "i" } },
    ];
  }

  if (featured === "true" || featured === "1") {
    filter.featured = true;
  }

  if (categorySlug && (categoryType === "INSTRUMENT" || categoryType === "SURGERY")) {
    const cat = await Category.findOne({ type: categoryType, slug: categorySlug }).lean();
    if (cat) filter.categoryIds = cat._id;
  }

  let query = Product.find(filter).sort({ featured: -1, name: 1 });
  if (Number.isFinite(take) && take! > 0) query = query.limit(take!);

  const products = await query.lean();

  const allCatIds = [...new Set(products.flatMap((p: any) => (p.categoryIds ?? []).map((id: any) => id.toString())))];
  const categories = allCatIds.length > 0
    ? await Category.find({ _id: { $in: allCatIds } }).lean()
    : [];
  const catMap = new Map(categories.map((c: any) => [c._id.toString(), c]));

  const mapped = products.map((p: any) => {
    const cats = (p.categoryIds ?? []).map((id: any) => catMap.get(id.toString())).filter(Boolean);
    return mapMongoProductToUiProduct(p, cats as any);
  });

  return NextResponse.json({ products: mapped });
}
