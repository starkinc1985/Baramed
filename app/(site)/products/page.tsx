import { Metadata } from "next";

export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  getFeaturedProductsFromDb,
  getInstrumentTypeCategoriesFromDb,
  getProductsPagedFromDb,
  getSurgeryTypeCategoriesFromDb,
} from "@/lib/catalog";
import ProductCard from "@/components/Product/ProductCard";
import AllProductsGrid from "./AllProductsGrid";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Product Catalog | BÄRAMED INSTRUMENTE GMBH",
  description: "Browse our comprehensive catalog of surgical instruments organized by instrument type and surgery type",
};

export default async function ProductsPage() {
  const [instrumentTypeCategories, surgeryTypeCategories, featured, { products: initialProducts, total }] =
    await Promise.all([
      getInstrumentTypeCategoriesFromDb(),
      getSurgeryTypeCategoriesFromDb(),
      getFeaturedProductsFromDb(12),
      getProductsPagedFromDb(0, 20),
    ]);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products" },
            ]}
          />
          <div className="text-center">
            <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Comprehensive Instrument Catalog
            </div>
            <h1 className="mb-2 text-2xl font-bold text-black dark:text-white lg:text-3xl">
              Product Catalog
            </h1>
            <p className="mx-auto mb-3 max-w-[600px] text-sm text-waterloo">
              Browse our comprehensive range of high-quality surgical instruments.
              Find products by instrument type, surgical specialty, or view all products below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-waterloo">
              {["Premium Quality", "ISO Certified", "Made in Germany"].map((label) => (
                <div key={label} className="flex items-center gap-1">
                  <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="bg-gray-50 py-10 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {/* By Instrument Type */}
            <div className="rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-blacksection">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold text-black dark:text-white">
                    Browse by Instrument Type
                  </h2>
                  <p className="text-sm text-waterloo">{instrumentTypeCategories.length} categories available</p>
                </div>
                <Link
                  href="/products/by-instrument-type"
                  className="flex-shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {instrumentTypeCategories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/by-instrument-type/${category.slug}`}
                    className="group flex min-h-[80px] flex-col items-center justify-center rounded-lg border border-stroke bg-white p-3 text-center transition-all hover:border-primary hover:bg-primary/5 dark:border-strokedark dark:bg-blacksection"
                  >
                    <h3 className="text-xs font-semibold leading-tight text-black transition-colors group-hover:text-primary dark:text-white">
                      {category.name}
                    </h3>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <p className="mt-1 text-[10px] font-medium text-primary">
                        {category.subcategories.length} sub
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* By Surgery Type */}
            <div className="rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-blacksection">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold text-black dark:text-white">
                    Browse by Surgery Type
                  </h2>
                  <p className="text-sm text-waterloo">{surgeryTypeCategories.length} specialties available</p>
                </div>
                <Link
                  href="/products/by-surgery-type"
                  className="flex-shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {surgeryTypeCategories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/by-surgery-type/${category.slug}`}
                    className="group flex min-h-[80px] flex-col items-center justify-center rounded-lg border border-stroke bg-white p-3 text-center transition-all hover:border-primary hover:bg-primary/5 dark:border-strokedark dark:bg-blacksection"
                  >
                    <h3 className="text-xs font-semibold leading-tight text-black transition-colors group-hover:text-primary dark:text-white">
                      {category.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="border-t border-stroke bg-white py-10 dark:border-strokedark dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-black dark:text-white lg:text-2xl">
                Featured Products
              </h2>
              <span className="text-sm text-waterloo">{featured.length} products</span>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="border-t border-stroke bg-gray-50 py-10 dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-black dark:text-white lg:text-2xl">
              All Products
            </h2>
            <span className="text-sm text-waterloo">{total} products</span>
          </div>

          <AllProductsGrid initialProducts={initialProducts} total={total} />
        </div>
      </section>
    </main>
  );
}
