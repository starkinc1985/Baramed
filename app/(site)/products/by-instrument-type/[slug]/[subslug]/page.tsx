import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { instrumentTypeCategories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import Image from "next/image";

export async function generateStaticParams() {
  const params: { slug: string; subslug: string }[] = [];
  
  instrumentTypeCategories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcat) => {
        params.push({
          slug: category.slug,
          subslug: subcat.slug,
        });
      });
    }
  });
  
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; subslug: string };
}): Promise<Metadata> {
  const category = instrumentTypeCategories.find(
    (cat) => cat.slug === params.slug
  );
  
  const subcategory = category?.subcategories?.find(
    (subcat) => subcat.slug === params.subslug
  );

  if (!category || !subcategory) {
    return {
      title: "Subcategory Not Found",
    };
  }

  return {
    title: `${subcategory.name} - ${category.name} | BÄRAMED INSTRUMENTE GMBH`,
    description: `Browse our ${subcategory.name} collection under ${category.name}`,
  };
}

export default function SubcategoryPage({
  params,
}: {
  params: { slug: string; subslug: string };
}) {
  const category = instrumentTypeCategories.find(
    (cat) => cat.slug === params.slug
  );
  
  const subcategory = category?.subcategories?.find(
    (subcat) => subcat.slug === params.subslug
  );

  if (!category || !subcategory) {
    notFound();
  }

  // Get products that match this subcategory
  const allProducts = getProductsByCategory(category.id);
  const products = allProducts.filter(
    (product) => product.subcategory === subcategory.slug
  );

  return (
    <main className="pt-20">
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-waterloo">
              <Link
                href="/products/by-instrument-type"
                className="hover:text-primary"
              >
                Instrument Types
              </Link>
              <span>/</span>
              <Link
                href={`/products/by-instrument-type/${category.slug}`}
                className="hover:text-primary"
              >
                {category.name}
              </Link>
              <span>/</span>
              <span className="text-black dark:text-white">{subcategory.name}</span>
            </div>
            <Link
              href={`/products/by-instrument-type/${category.slug}`}
              className="inline-flex items-center gap-2 text-waterloo hover:text-primary"
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
              Back to {category.name}
            </Link>
          </div>
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              {subcategory.name}
            </h1>
            <p className="mx-auto mb-8 max-w-[600px] text-regular text-waterloo">
              {subcategory.description || `Browse our ${subcategory.name} collection`}
            </p>
          </div>
        </div>
      </section>

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
              <p className="text-waterloo">No products found in this subcategory.</p>
              <Link
                href={`/products/by-instrument-type/${category.slug}`}
                className="mt-4 inline-block text-primary hover:underline"
              >
                View all {category.name} products
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

