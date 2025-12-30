import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { surgeryTypeCategories } from "@/data/categories";
import { getProductsBySurgeryType } from "@/data/products";
import Image from "next/image";

export async function generateStaticParams() {
  return surgeryTypeCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = surgeryTypeCategories.find(
    (cat) => cat.slug === params.slug
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

export default function SurgeryTypeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = surgeryTypeCategories.find(
    (cat) => cat.slug === params.slug
  );

  if (!category) {
    notFound();
  }

  const products = getProductsBySurgeryType(category.id);

  return (
    <main className="pt-20">
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-6">
            <Link
              href="/products/by-surgery-type"
              className="mb-4 inline-flex items-center gap-2 text-waterloo hover:text-primary"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Surgery Types
            </Link>
          </div>
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
        <section className="py-10">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <h2 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Instrument Types
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {category.subcategories.map((subcat) => (
                <div
                  key={subcat.id}
                  className="rounded-lg border border-stroke bg-white p-4 text-center dark:border-strokedark dark:bg-blacksection"
                >
                  <span className="font-medium text-black dark:text-white">
                    {subcat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Products ({products.length})
            </h2>
            {/* Filters would go here */}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group rounded-lg border border-stroke bg-white p-6 shadow-1 transition-all hover:shadow-2 dark:border-strokedark dark:bg-blacksection"
                >
                  <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={300}
                        height={300}
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
          ) : (
            <div className="rounded-lg border border-stroke bg-white p-12 text-center dark:border-strokedark dark:bg-blacksection">
              <p className="text-waterloo">No products found for this surgery type.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

