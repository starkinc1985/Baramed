import { Metadata } from "next";
import Link from "next/link";
import { surgeryTypeCategories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Browse by Surgery Type | BÄRAMED INSTRUMENTE GMBH",
  description: "Browse surgical instruments organized by surgical specialty",
};

export default function SurgeryTypePage() {
  return (
    <main className="pt-20">
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Browse by Surgery Type
            </h1>
            <p className="mx-auto mb-8 max-w-[600px] text-regular text-waterloo">
              Find instruments organized by surgical specialty and procedure type
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {surgeryTypeCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products/by-surgery-type/${category.slug}`}
                className="group rounded-lg border border-stroke bg-white p-6 shadow-1 transition-all hover:border-primary hover:shadow-2 dark:border-strokedark dark:bg-blacksection"
              >
                <h3 className="mb-3 text-xl font-semibold text-black transition-colors group-hover:text-primary dark:text-white">
                  {category.name}
                </h3>
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium text-waterloo">
                      Instrument Types:
                    </p>
                    <ul className="space-y-1">
                      {category.subcategories.slice(0, 3).map((subcat) => (
                        <li
                          key={subcat.id}
                          className="text-sm text-waterloo"
                        >
                          • {subcat.name}
                        </li>
                      ))}
                      {category.subcategories.length > 3 && (
                        <li className="text-sm text-primary">
                          +{category.subcategories.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  View Products
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

