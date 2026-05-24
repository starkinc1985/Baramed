"use client";

import { useState } from "react";
import ProductCard from "@/components/Product/ProductCard";
import type { Product } from "@/types/product";

const LOAD_SIZE = 20;

export default function AllProductsGrid({
  initialProducts,
  total,
}: {
  initialProducts: Product[];
  total: number;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const hasMore = products.length < total;

  async function loadMore() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products?skip=${products.length}&limit=${LOAD_SIZE}`,
      );
      const data = await res.json();
      setProducts((prev) => [...prev, ...(data.products ?? [])]);
    } finally {
      setLoading(false);
    }
  }

  if (total === 0) {
    return (
      <div className="rounded-xl border border-stroke bg-white py-16 text-center dark:border-strokedark dark:bg-blacksection">
        <p className="text-waterloo">No products available yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More / count row */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="text-sm text-waterloo">
          Showing {products.length} of {total} products
        </p>
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="flex items-center gap-2 rounded-full border border-stroke bg-white px-8 py-3 text-sm font-semibold text-black shadow-sm transition hover:border-primary hover:text-primary dark:border-strokedark dark:bg-blacksection dark:text-white dark:hover:border-primary dark:hover:text-primary disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading…
              </>
            ) : (
              <>
                Load {Math.min(LOAD_SIZE, total - products.length)} more products
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
