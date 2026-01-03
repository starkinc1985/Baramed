import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { surgeryTypeCategories } from "@/data/categories";
import { getProductsBySurgeryType } from "@/data/products";
import ProductCard from "@/components/Product/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";

// Helper function to map surgery type subcategory slug to instrument type category slug
const getInstrumentTypeSlug = (surgerySubcategorySlug: string): string => {
  const instrumentTypeSlugMap: Record<string, string> = {
    "gs-scissors": "scissors",
    "gs-forceps": "forceps",
    "gs-needle-holders": "needle-holders",
    "gs-retractors": "retractors",
    "gs-clamps": "clamps",
    "os-rongeurs": "rongeurs-bone-instruments",
    "os-bone-cutters": "rongeurs-bone-instruments",
    "os-drills": "orthopedic-instruments",
    "os-osteotomes": "orthopedic-instruments",
    "os-plates-screws": "orthopedic-instruments",
    "ent-ear": "ent-instruments",
    "ent-nasal": "ent-instruments",
    "ent-laryngeal": "ent-instruments",
    "ps-micro-scissors": "scissors",
    "ps-fine-forceps": "forceps",
    "ps-skin-hooks": "retractors",
    "ns-micro-forceps": "forceps",
    "ns-micro-scissors": "scissors",
    "ns-self-retaining-retractors": "retractors",
    "ns-rongeurs": "rongeurs-bone-instruments",
    "go-speculums": "gynecology-instruments",
    "go-uterine-forceps": "gynecology-instruments",
    "go-dilators": "probes-dilators",
    "cs-vascular-clamps": "clamps",
    "cs-bulldog-clamps": "clamps",
    "cs-micro-needle-holders": "needle-holders",
    "ds-extraction-instruments": "dental-instruments",
    "ds-elevators": "dental-instruments",
    "ds-curettes": "dental-instruments",
    "us-urology-forceps": "forceps",
    "us-dilators": "probes-dilators",
    "us-stone-graspers": "forceps",
    "ts-rib-spreaders": "retractors",
    "ts-thoracic-forceps": "forceps",
  };
  return instrumentTypeSlugMap[surgerySubcategorySlug] || surgerySubcategorySlug.replace(/^(gs-|os-|ent-|ps-|ns-|go-|cs-|ds-|us-|ts-)/, '');
};

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
  return surgeryTypeCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const category = surgeryTypeCategories.find(
    (cat) => cat.slug === resolvedParams.slug
  );

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | BÄRAMED INSTRUMENTE GMBH`,
    description: `Browse surgical instruments for ${category.name}`,
  };
}

export default async function SurgeryTypeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const category = surgeryTypeCategories.find(
    (cat) => cat.slug === resolvedParams.slug
  );

  if (!category) {
    notFound();
  }

  const products = getProductsBySurgeryType(category.slug);

  return (
    <main className="pt-20">
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Surgery Types", href: "/products/by-surgery-type" },
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
        <section className="py-10 bg-white dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-black dark:text-white">
                Browse by Instrument Type
              </h2>
              <span className="text-sm text-waterloo">
                {category.subcategories.length} instrument types available
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {category.subcategories.map((subcat) => {
                const instrumentTypeSlug = getInstrumentTypeSlug(subcat.slug);
                const subcatProducts = products.filter((p) => {
                  return p.category === instrumentTypeSlug;
                });
                const subcatImage = getPlaceholderImage(instrumentTypeSlug);

                return (
                  <Link
                    key={subcat.id}
                    href={`/products/by-instrument-type/${instrumentTypeSlug}`}
                    className="group relative overflow-hidden rounded-2xl border-2 border-stroke bg-white shadow-md transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-1 dark:border-strokedark dark:bg-blacksection"
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={subcatImage}
                        alt={subcat.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="p-4 text-center">
                      <span className="block font-bold text-black dark:text-white group-hover:text-primary transition-colors">
                        {subcat.name}
                      </span>
                      <span className="mt-1 block text-xs font-medium text-waterloo">
                        {subcatProducts.length} {subcatProducts.length === 1 ? 'product' : 'products'}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="py-20 lg:py-25">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-black dark:text-white">
                  All {category.name} Products
                </h2>
                <p className="mt-1 text-sm text-waterloo">
                  Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
              </div>
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="flex gap-2">
                  <span className="text-sm text-waterloo self-center">Filter by:</span>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 3).map((subcat) => {
                      const instrumentTypeSlug = getInstrumentTypeSlug(subcat.slug);
                      const subcatProducts = products.filter((p) => {
                        return p.category === instrumentTypeSlug;
                      });
                      if (subcatProducts.length === 0) return null;
                      return (
                        <Link
                          key={subcat.id}
                          href={`/products/by-instrument-type/${instrumentTypeSlug}`}
                          className="rounded-full border border-stroke bg-white px-3 py-1 text-xs font-medium text-waterloo transition-colors hover:border-primary hover:text-primary dark:border-strokedark dark:bg-blacksection"
                        >
                          {subcat.name} ({subcatProducts.length})
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {products.length === 0 && (
        <section className="py-20 lg:py-25">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="rounded-lg border border-stroke bg-white p-12 text-center dark:border-strokedark dark:bg-blacksection">
              <p className="text-waterloo mb-4">No products found for this surgery type.</p>
              <Link
                href="/products/by-surgery-type"
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
                Browse other surgery types
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

