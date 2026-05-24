"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type ProductRow = {
  id: string;
  name: string;
  productCode: string;
  thumb: string | null;
  featured: boolean;
  inStock: boolean;
  topCatName: string | null;
};

const LOAD_SIZE = 20;

export default function ProductsTable({
  initialProducts,
  total,
  q,
}: {
  initialProducts: ProductRow[];
  total: number;
  q: string;
}) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [loadingMore, setLoadingMore] = useState(false);
  const hasMore = products.length < total;

  async function loadMore() {
    setLoadingMore(true);
    try {
      const params = new URLSearchParams({
        skip: String(products.length),
        limit: String(LOAD_SIZE),
      });
      if (q) params.set("q", q);
      const res = await fetch(`/api/admin/products?${params}`);
      const data = await res.json();
      setProducts((prev) => [...prev, ...(data.products ?? [])]);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Product</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Code</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Category</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-strokedark">
                      {p.thumb ? (
                        <Image src={p.thumb} alt={p.name} width={40} height={40} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-waterloo">—</div>
                      )}
                    </div>
                    <span className="line-clamp-1 font-medium text-black dark:text-white">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-waterloo">{p.productCode}</td>
                <td className="hidden px-4 py-3 text-xs text-waterloo md:table-cell">{p.topCatName ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.featured && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Featured</span>
                    )}
                    {p.inStock ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">In Stock</span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-waterloo dark:bg-strokedark">Out of Stock</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-waterloo">
                  {q ? `No products matching "${q}".` : "No products yet."}{" "}
                  {!q && <Link href="/admin/products/new" className="text-primary hover:underline">Add one</Link>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-waterloo">
        <span>
          Showing {products.length} of {total.toLocaleString()}
          {q && <> · filtered</>}
        </span>
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white disabled:opacity-60"
          >
            {loadingMore && (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {loadingMore ? "Loading…" : `Load ${Math.min(LOAD_SIZE, total - products.length)} more`}
          </button>
        )}
      </div>
    </>
  );
}
