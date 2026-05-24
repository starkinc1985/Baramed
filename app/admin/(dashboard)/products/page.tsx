import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ImportButton from "./ImportButton";
import ExportButton from "./ExportButton";
import DeleteAllButton from "./DeleteAllButton";
import ProductsTable, { type ProductRow } from "./ProductsTable";

export const metadata: Metadata = { title: "Products | Admin" };

const INITIAL_SIZE = 20;

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const sp = searchParams instanceof Promise ? await searchParams : searchParams;
  const q = sp.q?.trim() ?? "";

  await connectDB();

  const filter = q
    ? { $or: [{ name: { $regex: q, $options: "i" } }, { productCode: { $regex: q, $options: "i" } }] }
    : {};

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .select("name productCode images featured inStock categoryIds")
      .sort({ featured: -1, name: 1 })
      .limit(INITIAL_SIZE)
      .lean(),
  ]);

  // Batch fetch categories in one query
  const allCatIds = [
    ...new Set(
      products.flatMap((p: any) => (p.categoryIds ?? []).map((id: any) => id.toString())),
    ),
  ];
  const categories =
    allCatIds.length > 0
      ? await Category.find({ _id: { $in: allCatIds } }).select("_id name parentId").lean()
      : [];
  const catMap = new Map(categories.map((c: any) => [c._id.toString(), c]));

  const initialProducts: ProductRow[] = (products as any[]).map((p) => {
    const cats = (p.categoryIds ?? []).map((id: any) => catMap.get(id.toString())).filter(Boolean);
    const topCatName = (cats as any[]).find((c: any) => !c.parentId)?.name ?? null;
    return {
      id: p._id.toString(),
      name: p.name,
      productCode: p.productCode,
      thumb: p.images?.[0]?.url ?? null,
      featured: p.featured,
      inStock: p.inStock,
      topCatName,
    };
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Products</h1>
          <p className="text-sm text-waterloo">{total.toLocaleString()} total</p>
        </div>
        <div className="flex items-center gap-2">
          <DeleteAllButton />
          <ExportButton />
          <ImportButton />
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho"
          >
            + New Product
          </Link>
        </div>
      </div>

      {/* Search */}
      <form method="GET" action="/admin/products" className="mb-4">
        <div className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name or product code…"
            className="w-72 rounded-lg border border-stroke bg-white px-3 py-2 text-sm text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-blacksection dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-black hover:border-primary hover:text-primary dark:border-strokedark dark:text-white"
          >
            Search
          </button>
          {q && (
            <Link
              href="/admin/products"
              className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-waterloo hover:border-primary hover:text-primary dark:border-strokedark"
            >
              Clear
            </Link>
          )}
        </div>
      </form>

      {/* key={q} forces the client component to reset state when search changes */}
      <ProductsTable key={q} initialProducts={initialProducts} total={total} q={q} />
    </div>
  );
}
