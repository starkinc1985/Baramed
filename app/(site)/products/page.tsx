import { Metadata } from "next";
import Link from "next/link";
import { instrumentTypeCategories, surgeryTypeCategories } from "@/data/categories";
import { getFeaturedProducts, sampleProducts } from "@/data/products";
import ProductCard from "@/components/Product/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Product Catalog | BÄRAMED INSTRUMENTE GMBH",
  description: "Browse our comprehensive catalog of surgical instruments organized by instrument type and surgery type",
};

export default function ProductsPage() {
  const featuredProducts = getFeaturedProducts();
  // Show first 8 products if no featured products, or show featured + some regular products
  const displayProducts = featuredProducts.length > 0 
    ? featuredProducts 
    : sampleProducts.slice(0, 8);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-12 dark:from-slate-900 dark:via-slate-800 dark:to-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products" },
            ]}
          />
          <div className="text-center">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              Comprehensive Instrument Catalog
            </div>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white lg:text-5xl">
              Product Catalog
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Browse our comprehensive range of high-quality surgical instruments.
              Find products by instrument type or surgical specialty.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-slate-800/80">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-slate-800/80">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-slate-800/80">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Made in Germany</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Navigation */}
      <section className="bg-white py-12 lg:py-16 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Browse by Instrument Type */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white lg:text-3xl">
                    Browse by Instrument Type
                  </h2>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {instrumentTypeCategories.length} categories available
                  </p>
                </div>
                <Link
                  href="/products/by-instrument-type"
                  className="flex-shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primaryho hover:shadow-xl hover:shadow-primary/30"
                >
                  View All
                  <svg
                    className="ml-2 inline h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
                {instrumentTypeCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/by-instrument-type/${category.slug}`}
                    className="group flex min-h-[100px] flex-col items-center justify-center rounded-xl border-2 border-slate-200 bg-slate-50 p-4 text-center transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-primary"
                  >
                    <h3 className="font-bold text-sm leading-tight text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                      {category.name}
                    </h3>
                    {category.subcategories && (
                      <p className="mt-2 text-xs font-semibold text-primary">
                        {category.subcategories.length} {category.subcategories.length === 1 ? 'subcategory' : 'subcategories'}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse by Surgery Type */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white lg:text-3xl">
                    Browse by Surgery Type
                  </h2>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {surgeryTypeCategories.length} specialties available
                  </p>
                </div>
                <Link
                  href="/products/by-surgery-type"
                  className="flex-shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primaryho hover:shadow-xl hover:shadow-primary/30"
                >
                  View All
                  <svg
                    className="ml-2 inline h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
                {surgeryTypeCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/by-surgery-type/${category.slug}`}
                    className="group flex min-h-[100px] flex-col items-center justify-center rounded-xl border-2 border-slate-200 bg-slate-50 p-4 text-center transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-primary"
                  >
                    <h3 className="font-bold text-sm leading-tight text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                      {category.name}
                    </h3>
                    {category.subcategories && (
                      <p className="mt-2 text-xs font-semibold text-primary">
                        {category.subcategories.length} {category.subcategories.length === 1 ? 'type' : 'types'}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products / All Products */}
      {displayProducts.length > 0 && (
        <section className="bg-gradient-to-b from-white to-slate-50 py-12 dark:from-blacksection dark:to-slate-900">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-10 text-center">
              <div className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                {featuredProducts.length > 0 ? "Featured Selection" : "Popular Items"}
              </div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                {featuredProducts.length > 0 ? "Featured Products" : "Popular Products"}
              </h2>
              <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
                Discover our handpicked selection of premium surgical instruments
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {displayProducts.length < sampleProducts.length && (
              <div className="mt-10 text-center">
                <Link
                  href="/products/by-instrument-type"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primaryho hover:shadow-xl hover:shadow-primary/30"
                >
                  View All Products
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

