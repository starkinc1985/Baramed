import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  findInstrumentCategoryBySlug,
  getProductsByInstrumentParentSlug,
  getStaticInstrumentSlugs,
} from "@/lib/catalog";
import ProductCard from "@/components/Product/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateStaticParams() {
  return getStaticInstrumentSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const category = await findInstrumentCategoryBySlug(resolvedParams.slug);
  if (!category) return { title: "Category Not Found" };
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
  const category = await findInstrumentCategoryBySlug(resolvedParams.slug);
  if (!category) notFound();

  const products = await getProductsByInstrumentParentSlug(category.slug);

  return (
    <main className="pt-20">
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-black dark:to-gray-900 lg:py-30">
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
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">{category.name}</h1>
            {category.description && (
              <p className="mx-auto mb-8 max-w-[600px] text-regular text-waterloo">{category.description}</p>
            )}
          </div>
        </div>
      </section>

      {category.subcategories && category.subcategories.length > 0 && (
        <section className="border-b border-stroke bg-gray-50 py-4 dark:border-strokedark dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black dark:text-white">Browse by Subcategory</h2>
              <span className="text-xs text-waterloo">{category.subcategories.length} subcategories available</span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {category.subcategories.map((subcat) => {
                const subcatProducts = products.filter((p) => p.subcategory === subcat.slug);
                return (
                  <Link
                    key={subcat.id}
                    href={`/products/by-instrument-type/${category.slug}/${subcat.slug}`}
                    className="group flex min-h-[75px] flex-col items-center justify-center rounded border border-stroke bg-white p-3 text-center transition-all hover:border-primary hover:bg-primary/5 dark:border-strokedark dark:bg-blacksection"
                  >
                    <span className="block text-xs font-semibold text-black transition-colors group-hover:text-primary dark:text-white">{subcat.name}</span>
                    <span className="mt-1 block text-xs font-medium text-primary">
                      {subcatProducts.length} {subcatProducts.length === 1 ? "product" : "products"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {products.length > 0 ? (
        <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white lg:text-2xl">
              All {category.name} Products
              <span className="ml-2 text-sm font-normal text-waterloo">({products.length})</span>
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="rounded-lg border border-stroke p-6 text-center dark:border-strokedark">
              <p className="mb-3 text-sm text-waterloo">No products found in this category.</p>
              <Link href="/products/by-instrument-type" className="inline-flex items-center gap-2 text-primary hover:underline">
                Browse other categories
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
