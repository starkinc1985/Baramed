import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DownloadCategory } from "@prisma/client";

export const metadata: Metadata = {
  title: "Downloads | BÄRAMED INSTRUMENTE GMBH",
  description:
    "Download our product catalogs, certificates, brochures, and instructions for use",
};

const categoryLabels: Record<DownloadCategory, string> = {
  CATALOG: "Product Catalog",
  CERTIFICATE: "Certificates",
  BROCHURE: "Brochures",
  IFU: "Instructions for Use",
  OTHER: "Other Documents",
};

const categoryOrder: DownloadCategory[] = [
  "CATALOG",
  "CERTIFICATE",
  "BROCHURE",
  "IFU",
  "OTHER",
];

export default async function DownloadsPage() {
  const downloads = await prisma.download.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  const grouped = downloads.reduce<Record<string, typeof downloads>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {},
  );

  const orderedCategories = categoryOrder.filter((c) => grouped[c]?.length);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 dark:from-black dark:to-gray-900 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Downloads
            </h1>
            <p className="mx-auto mb-8 max-w-[800px] text-regular text-waterloo">
              Access our product catalogs, certificates, brochures, and
              instructions for use
            </p>
          </div>
        </div>
      </section>

      {/* Downloads by Category */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {orderedCategories.map((category) => (
            <div key={category} className="mb-15">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                {categoryLabels[category]}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {grouped[category].map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-stroke bg-white p-6 shadow-1 dark:border-strokedark dark:bg-blacksection"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mb-4 text-sm text-waterloo">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 flex items-center gap-4 text-sm text-waterloo">
                      {item.fileSize && <span>{item.fileSize}</span>}
                      {item.fileSize && item.fileType && <span>•</span>}
                      {item.fileType && <span>{item.fileType}</span>}
                    </div>
                    <a
                      href={item.downloadUrl}
                      download
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-transparent px-6 py-3 text-regular font-medium text-primary duration-300 ease-in-out hover:bg-primary/10"
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="rounded-lg border border-stroke bg-primary/5 p-12 text-center dark:border-strokedark">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Need Additional Documentation?
            </h2>
            <p className="mb-8 text-regular text-waterloo">
              Contact us if you need specific certificates, technical drawings,
              or other documentation
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-regular font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
