import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { instrumentTypeCategories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/Product/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

// Helper function to get placeholder image
function getPlaceholderImage(categorySlug: string): string {
  const imageMap: Record<string, string> = {
    "scissors": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=200&fit=crop&q=80",
    "forceps": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&q=80",
    "needle-holders": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=200&fit=crop&q=80",
    "retractors": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop&q=80",
    "clamps": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop&q=80",
  };
  return imageMap[categorySlug] || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&q=80";
}

export async function generateStaticParams() {
  return instrumentTypeCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const category = instrumentTypeCategories.find(
    (cat) => cat.slug === resolvedParams.slug
  );

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | BÄRAMED INSTRUMENTE GMBH`,
    description: `Browse our ${category.name} collection of surgical instruments`,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const category = instrumentTypeCategories.find(
    (cat) => cat.slug === resolvedParams.slug
  );

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <main className="pt-20">
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Instrument Types", href: "/products/by-instrument-type" },
              { label: category.name },
            ]}
          />
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              {category.name}
            </h1>
            {category.description && (
              <p className="mx-auto mb-8 max-w-[600px] text-regular text-waterloo">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

        {category.subcategories && category.subcategories.length > 0 && (
          <section className="border-b border-stroke bg-gray-50 py-4 dark:border-strokedark dark:bg-blacksection">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Browse by Subcategory
                </h2>
                <span className="text-xs text-waterloo">
                  {category.subcategories.length} subcategories available
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {category.subcategories.map((subcat) => {
                const subcatProducts = products.filter(
                  (p) => p.subcategory === subcat.slug
                );
                // Get a sample product image for the subcategory
                const sampleProduct = subcatProducts[0];
                const subcatImage = sampleProduct?.images[0] || getPlaceholderImage(category.slug);
                
                return (
                  <Link
                    key={subcat.id}
                    href={`/products/by-instrument-type/${category.slug}/${subcat.slug}`}
                    className="group flex min-h-[75px] flex-col items-center justify-center rounded border border-stroke bg-white p-3 text-center transition-all hover:border-primary hover:bg-primary/5 dark:border-strokedark dark:bg-blacksection"
                  >
                    <span className="block font-semibold text-xs text-black transition-colors group-hover:text-primary dark:text-white">
                      {subcat.name}
                    </span>
                    <span className="mt-1 block text-xs font-medium text-primary">
                      {subcatProducts.length} {subcatProducts.length === 1 ? 'product' : 'products'}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

        {products.length > 0 && (
          <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-black dark:text-white lg:text-2xl">
                    All {category.name} Products
                  </h2>
                  <p className="mt-0.5 text-xs text-waterloo">
                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="flex gap-1.5">
                    <span className="text-xs text-waterloo self-center">Filter:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {category.subcategories.slice(0, 3).map((subcat) => {
                        const subcatProducts = products.filter(
                          (p) => p.subcategory === subcat.slug
                        );
                        if (subcatProducts.length === 0) return null;
                        return (
                          <Link
                            key={subcat.id}
                            href={`/products/by-instrument-type/${category.slug}/${subcat.slug}`}
                            className="rounded border border-stroke bg-white px-2 py-0.5 text-xs font-medium text-waterloo transition-colors hover:border-primary hover:text-primary dark:border-strokedark dark:bg-blacksection"
                          >
                            {subcat.name} ({subcatProducts.length})
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

        {products.length === 0 && (
          <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
            <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
              <div className="rounded-lg border border-stroke bg-white p-6 text-center dark:border-strokedark dark:bg-blacksection">
                <p className="text-sm text-waterloo mb-3">No products found in this category.</p>
              <Link
                href="/products/by-instrument-type"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Browse other categories
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

