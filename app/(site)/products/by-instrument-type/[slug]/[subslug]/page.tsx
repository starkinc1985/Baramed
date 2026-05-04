import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  findInstrumentCategoryBySlug,
  getProductsByInstrumentParentAndSubSlug,
  getStaticInstrumentSubslugs,
} from "@/lib/catalog";
import ProductCard from "@/components/Product/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateStaticParams() {
  return getStaticInstrumentSubslugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }> | { slug: string; subslug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const category = await findInstrumentCategoryBySlug(resolvedParams.slug);
  const subcategory = category?.subcategories?.find((s) => s.slug === resolvedParams.subslug);
  if (!category || !subcategory) return { title: "Subcategory Not Found" };
  return {
    title: `${subcategory.name} - ${category.name} | BÄRAMED INSTRUMENTE GMBH`,
    description: `Browse our ${subcategory.name} collection under ${category.name}`,
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string; subslug: string }> | { slug: string; subslug: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const category = await findInstrumentCategoryBySlug(resolvedParams.slug);
  const subcategory = category?.subcategories?.find((s) => s.slug === resolvedParams.subslug);
  if (!category || !subcategory) notFound();

  const products = await getProductsByInstrumentParentAndSubSlug(
    category.slug,
    subcategory.slug,
  );

  return (
    <main className="pt-20">
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-black dark:to-gray-900 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Instrument Types", href: "/products/by-instrument-type" },
              { label: category.name, href: `/products/by-instrument-type/${category.slug}` },
              { label: subcategory.name },
            ]}
          />
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">{subcategory.name}</h1>
            <p className="mx-auto mb-8 max-w-[600px] text-regular text-waterloo">
              {subcategory.description || `Browse our ${subcategory.name} collection`}
            </p>
          </div>
        </div>
      </section>

      {products.length > 0 ? (
        <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-black dark:text-white lg:text-2xl">{subcategory.name} Products</h2>
                <p className="mt-0.5 text-xs text-waterloo">
                  Showing {products.length} {products.length === 1 ? "product" : "products"}
                </p>
              </div>
              <Link
                href={`/products/by-instrument-type/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-lg border border-stroke bg-white px-4 py-2 text-sm font-medium text-waterloo transition-colors hover:border-primary hover:text-primary dark:border-strokedark dark:bg-blacksection"
              >
                View all {category.name}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
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
              <p className="mb-3 text-sm text-waterloo">No products found in this subcategory.</p>
              <Link href={`/products/by-instrument-type/${category.slug}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                View all {category.name} products
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
