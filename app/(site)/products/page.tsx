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
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary/5 dark:from-black dark:via-gray-900 dark:to-primary/10 py-20 lg:py-30">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 h-64 w-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="relative mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products" },
            ]}
          />
          <div className="text-center">
            <div className="mb-6 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
              Comprehensive Instrument Catalog
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-black dark:text-white xl:text-5xl xl:text-hero">
              Product Catalog
            </h1>
            <p className="mx-auto mb-8 max-w-[700px] text-lg leading-relaxed text-waterloo">
              Browse our comprehensive range of high-quality surgical instruments. 
              Find products by instrument type or surgical specialty.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-waterloo">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Made in Germany</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Navigation */}
      <section className="py-20 lg:py-25 bg-gray-50 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Browse by Instrument Type */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-stroke bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-strokedark dark:bg-blacksection">
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-3xl -z-0"></div>
              
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                      Browse by Instrument Type
                    </h2>
                    <p className="mt-1 text-sm text-waterloo">
                      {instrumentTypeCategories.length} categories available
                    </p>
                  </div>
                </div>
                
                <p className="mb-6 text-regular leading-relaxed text-waterloo">
                  Find instruments organized by their type and function
                </p>
                
                <Link
                  href="/products/by-instrument-type"
                  className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-regular font-semibold text-white shadow-md transition-all duration-300 hover:bg-primaryho hover:shadow-lg hover:scale-105"
                >
                  View All Instrument Types
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
                
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {instrumentTypeCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products/by-instrument-type/${category.slug}`}
                      className="group relative rounded-xl border-2 border-stroke bg-white p-4 text-center transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:-translate-y-0.5 dark:border-strokedark dark:bg-blacksection"
                    >
                      <h3 className="font-bold text-sm text-black transition-colors group-hover:text-primary dark:text-white">
                        {category.name}
                      </h3>
                      {category.subcategories && (
                        <p className="mt-2 text-xs font-medium text-primary">
                          {category.subcategories.length} {category.subcategories.length === 1 ? 'subcategory' : 'subcategories'}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Browse by Surgery Type */}
            <div className="group relative overflow-hidden rounded-2xl border-2 border-stroke bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-strokedark dark:bg-blacksection">
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-3xl -z-0"></div>
              
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                      Browse by Surgery Type
                    </h2>
                    <p className="mt-1 text-sm text-waterloo">
                      {surgeryTypeCategories.length} specialties available
                    </p>
                  </div>
                </div>
                
                <p className="mb-6 text-regular leading-relaxed text-waterloo">
                  Find instruments organized by surgical specialty
                </p>
                
                <Link
                  href="/products/by-surgery-type"
                  className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-regular font-semibold text-white shadow-md transition-all duration-300 hover:bg-primaryho hover:shadow-lg hover:scale-105"
                >
                  View All Surgery Types
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
                
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {surgeryTypeCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products/by-surgery-type/${category.slug}`}
                      className="group relative rounded-xl border-2 border-stroke bg-white p-4 text-center transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:-translate-y-0.5 dark:border-strokedark dark:bg-blacksection"
                    >
                      <h3 className="font-bold text-sm text-black transition-colors group-hover:text-primary dark:text-white">
                        {category.name}
                      </h3>
                      {category.subcategories && (
                        <p className="mt-2 text-xs font-medium text-primary">
                          {category.subcategories.length} {category.subcategories.length === 1 ? 'type' : 'types'}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products / All Products */}
      {displayProducts.length > 0 && (
        <section className="py-20 lg:py-25 bg-white dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                {featuredProducts.length > 0 ? "Featured Selection" : "Popular Items"}
              </div>
              <h2 className="mb-4 text-3xl font-bold text-black dark:text-white">
                {featuredProducts.length > 0 ? "Featured Products" : "Popular Products"}
              </h2>
              <p className="mx-auto max-w-[600px] text-regular text-waterloo">
                Discover our handpicked selection of premium surgical instruments
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {displayProducts.length < sampleProducts.length && (
              <div className="mt-12 text-center">
                <Link
                  href="/products/by-instrument-type"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary bg-transparent px-8 py-4 text-regular font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105"
                >
                  View All Products
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
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

