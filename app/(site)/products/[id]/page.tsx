import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory } from "@/data/products";
import InquiryButton from "@/components/Product/InquiryButton";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/Product/ProductCard";
import { instrumentTypeCategories } from "@/data/categories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | BÄRAMED INSTRUMENTE GMBH`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  // Find category for breadcrumb and related products
  const category = instrumentTypeCategories.find(
    (cat) => cat.slug === product.category
  );
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  if (category) {
    breadcrumbItems.push({
      label: category.name,
      href: `/products/by-instrument-type/${category.slug}`,
    });
  }

  breadcrumbItems.push({ label: product.name });

  // Get related products (same category, excluding current product)
  const relatedProducts = category
    ? getProductsByCategory(category.slug)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  return (
    <main className="pt-20">
      <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <Breadcrumb items={breadcrumbItems} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Product Images */}
            <div>
              <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-waterloo">
                    No Image Available
                  </div>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100"
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - View ${index + 2}`}
                        width={150}
                        height={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">
                {product.name}
              </h1>
              <p className="mb-6 text-lg text-waterloo">
                Product Code: <span className="font-semibold text-black dark:text-white">{product.productCode}</span>
              </p>

              <div className="mb-6 rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
                <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Description
                </h2>
                <p className="text-regular text-waterloo">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {Object.keys(product.specifications).length > 0 && (
                <div className="mb-6 rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
                  <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Specifications
                  </h2>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      value && (
                        <div key={key} className="flex justify-between">
                          <dt className="font-medium text-black dark:text-white capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </dt>
                          <dd className="text-waterloo">{value}</dd>
                        </div>
                      )
                    ))}
                  </dl>
                </div>
              )}

              {/* Compliance */}
              {Object.keys(product.compliance).length > 0 && (
                <div className="mb-6 rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
                  <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                    Compliance & Certifications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.compliance.iso?.map((iso) => (
                      <span
                        key={iso}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {iso}
                      </span>
                    ))}
                    {product.compliance.ce && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        CE Marked
                      </span>
                    )}
                    {product.compliance.mdr && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        MDR Compliant
                      </span>
                    )}
                    {product.compliance.fda && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        FDA Approved
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Inquiry Button */}
              <InquiryButton product={product} />
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-6 pt-4 border-t border-stroke dark:border-strokedark">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-black dark:text-white lg:text-2xl">
                    Related Products
                  </h2>
                  <p className="mt-0.5 text-xs text-waterloo">
                    More {category?.name.toLowerCase()} instruments
                  </p>
                </div>
                {category && (
                  <Link
                    href={`/products/by-instrument-type/${category.slug}`}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View All {category.name} →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

