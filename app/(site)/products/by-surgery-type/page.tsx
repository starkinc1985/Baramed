import { Metadata } from "next";
import Link from "next/link";
import { surgeryTypeCategories } from "@/data/categories";
import CategoryCard from "@/components/Category/CategoryCard";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Browse by Surgery Type | BÄRAMED INSTRUMENTE GMBH",
  description: "Browse surgical instruments organized by surgical specialty",
};

export default function SurgeryTypePage() {
  return (
    <main className="pt-20">
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Surgery Types" },
            ]}
          />
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
              <CategoryCard
                key={category.id}
                category={category}
                basePath="/products/by-surgery-type"
                subcategoryLabel="Instrument Types:"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

