import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/data/products";
import InquiryButton from "@/components/Product/InquiryButton";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProductById(params.id);

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

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="pt-20">
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-6">
            <Link
              href="/products"
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
              Back to Products
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
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
        </div>
      </section>
    </main>
  );
}

