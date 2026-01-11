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
              Find products by instrument type or surgical specialty.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-waterloo">
              <div className="flex items-center gap-1">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Made in Germany</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Navigation */}
      <section className="py-12 lg:py-16 bg-gray-50 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2">
            {/* Browse by Instrument Type */}
            <div className="rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-blacksection">
              <div className="mb-5 flex items-start justify-between">
                  <div>
                    <h2 className="mb-1 text-xl font-bold text-black dark:text-white lg:text-2xl">
                      Browse by Instrument Type
                    </h2>
                    <p className="text-sm text-waterloo">
                      {instrumentTypeCategories.length} categories available
                    </p>
                  </div>
                  <Link
                    href="/products/by-instrument-type"
                    className="flex-shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primaryho lg:px-5 lg:py-2.5"
                  >
                    View All
                    <svg
                      className="ml-1 inline h-4 w-4"
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
                
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
                  {instrumentTypeCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products/by-instrument-type/${category.slug}`}
                      className="group flex min-h-[90px] flex-col items-center justify-center rounded-lg border border-stroke bg-white p-4 text-center transition-all hover:border-primary hover:bg-primary/5 dark:border-strokedark dark:bg-blacksection"
                    >
                      <h3 className="font-semibold text-sm leading-tight text-black transition-colors group-hover:text-primary dark:text-white">
                        {category.name}
                      </h3>
                      {category.subcategories && (
                        <p className="mt-1.5 text-xs font-medium text-primary">
                          {category.subcategories.length} {category.subcategories.length === 1 ? 'subcategory' : 'subcategories'}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
            </div>

            {/* Browse by Surgery Type */}
            <div className="rounded-lg border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-blacksection">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold text-black dark:text-white lg:text-2xl">
                    Browse by Surgery Type
                  </h2>
                  <p className="text-sm text-waterloo">
                    {surgeryTypeCategories.length} specialties available
                  </p>
                </div>
                <Link
                  href="/products/by-surgery-type"
                  className="flex-shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primaryho lg:px-5 lg:py-2.5"
                >
                  View All
                  <svg
                    className="ml-1 inline h-4 w-4"
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
              
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
                {surgeryTypeCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/by-surgery-type/${category.slug}`}
                    className="group flex min-h-[90px] flex-col items-center justify-center rounded-lg border border-stroke bg-white p-4 text-center transition-all hover:border-primary hover:bg-primary/5 dark:border-strokedark dark:bg-blacksection"
                  >
                    <h3 className="font-semibold text-sm leading-tight text-black transition-colors group-hover:text-primary dark:text-white">
                      {category.name}
                    </h3>
                    {category.subcategories && (
                      <p className="mt-1.5 text-xs font-medium text-primary">
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
        <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-4 text-center">
              <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {featuredProducts.length > 0 ? "Featured Selection" : "Popular Items"}
              </div>
              <h2 className="mb-2 text-xl font-bold text-black dark:text-white lg:text-2xl">
                {featuredProducts.length > 0 ? "Featured Products" : "Popular Products"}
              </h2>
              <p className="mx-auto max-w-[600px] text-xs text-waterloo">
                Discover our handpicked selection of premium surgical instruments
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {displayProducts.length < sampleProducts.length && (
              <div className="mt-4 text-center">
                <Link
                  href="/products/by-instrument-type"
                  className="inline-flex items-center gap-1.5 rounded border border-primary bg-transparent px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  View All Products
                  <svg
                    className="h-3 w-3"
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

