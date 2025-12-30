import { Metadata } from "next";
import Link from "next/link";
import { instrumentTypeCategories, surgeryTypeCategories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Product Catalog | BÄRAMED INSTRUMENTE GMBH",
  description: "Browse our comprehensive catalog of surgical instruments organized by instrument type and surgery type",
};

export default function ProductsPage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Product Catalog
            </h1>
            <p className="mx-auto mb-8 max-w-[600px] text-regular text-waterloo">
              Browse our comprehensive range of high-quality surgical instruments. 
              Find products by instrument type or surgical specialty.
            </p>
          </div>
        </div>
      </section>

      {/* Dual Navigation */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Browse by Instrument Type */}
            <div className="rounded-lg border border-stroke bg-white p-8 shadow-1 dark:border-strokedark dark:bg-blacksection">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Browse by Instrument Type
              </h2>
              <p className="mb-6 text-regular text-waterloo">
                Find instruments organized by their type and function
              </p>
              <Link
                href="/products/by-instrument-type"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-regular font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
              >
                View All Instrument Types
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
              <div className="mt-6 grid grid-cols-2 gap-4">
                {instrumentTypeCategories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/by-instrument-type/${category.slug}`}
                    className="rounded-lg border border-stroke p-4 transition-colors hover:border-primary hover:bg-primary/5 dark:border-strokedark"
                  >
                    <h3 className="font-semibold text-black dark:text-white">
                      {category.name}
                    </h3>
                    {category.subcategories && (
                      <p className="mt-1 text-sm text-waterloo">
                        {category.subcategories.length} subcategories
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse by Surgery Type */}
            <div className="rounded-lg border border-stroke bg-white p-8 shadow-1 dark:border-strokedark dark:bg-blacksection">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Browse by Surgery Type
              </h2>
              <p className="mb-6 text-regular text-waterloo">
                Find instruments organized by surgical specialty
              </p>
              <Link
                href="/products/by-surgery-type"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-regular font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
              >
                View All Surgery Types
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
              <div className="mt-6 grid grid-cols-2 gap-4">
                {surgeryTypeCategories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/by-surgery-type/${category.slug}`}
                    className="rounded-lg border border-stroke p-4 transition-colors hover:border-primary hover:bg-primary/5 dark:border-strokedark"
                  >
                    <h3 className="font-semibold text-black dark:text-white">
                      {category.name}
                    </h3>
                    {category.subcategories && (
                      <p className="mt-1 text-sm text-waterloo">
                        {category.subcategories.length} subcategories
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 lg:py-25">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <h2 className="mb-10 text-2xl font-bold text-black dark:text-white">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group rounded-lg border border-stroke bg-white p-6 shadow-1 transition-all hover:shadow-2 dark:border-strokedark dark:bg-blacksection"
                >
                  <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-waterloo">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="mb-2 font-semibold text-black dark:text-white">
                    {product.name}
                  </h3>
                  <p className="mb-2 text-sm text-waterloo">
                    Code: {product.productCode}
                  </p>
                  <p className="text-sm text-waterloo line-clamp-2">
                    {product.shortDescription || product.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

