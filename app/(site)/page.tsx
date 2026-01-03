import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import Manufacturing from "@/components/Manufacturing";
import Certifications from "@/components/Certifications";
import YouTubeVideos from "@/components/YouTubeVideos";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import { getFeaturedProducts } from "@/data/products";
import Link from "next/link";
import ProductCard from "@/components/Product/ProductCard";

export const metadata: Metadata = {
  title: "BÄRAMED INSTRUMENTE GMBH - Premium Surgical Instruments",
  description: "Leading German manufacturer of high-quality surgical instruments. ISO 13485 certified, CE marked, and MDR compliant.",
};

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      <Hero />
      
      {/* Quick Navigation to Categories */}
      <section className="bg-gray-50 py-20 lg:py-25 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center mb-15">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Browse Our Products
            </h2>
            <p className="text-regular text-waterloo">
              Find instruments by type or surgical specialty
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/products/by-instrument-type"
              className="group rounded-lg border border-stroke bg-white p-8 shadow-1 transition-all hover:border-primary hover:shadow-2 dark:border-strokedark dark:bg-blacksection"
            >
              <h3 className="mb-4 text-xl font-semibold text-black transition-colors group-hover:text-primary dark:text-white">
                By Instrument Type
              </h3>
              <p className="mb-4 text-regular text-waterloo">
                Browse by instrument category: Scissors, Forceps, Retractors, and more
              </p>
              <span className="inline-flex items-center gap-2 text-primary">
                View Categories
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="/products/by-surgery-type"
              className="group rounded-lg border border-stroke bg-white p-8 shadow-1 transition-all hover:border-primary hover:shadow-2 dark:border-strokedark dark:bg-blacksection"
            >
              <h3 className="mb-4 text-xl font-semibold text-black transition-colors group-hover:text-primary dark:text-white">
                By Surgery Type
              </h3>
              <p className="mb-4 text-regular text-waterloo">
                Browse by surgical specialty: General, Orthopedic, ENT, Neurosurgery, and more
              </p>
              <span className="inline-flex items-center gap-2 text-primary">
                View Categories
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 lg:py-25">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="text-center mb-15">
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Featured Products
              </h2>
              <p className="text-regular text-waterloo">
                Explore our most popular surgical instruments
              </p>
            </div>
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-regular font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
              >
                View All Products
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Manufacturing />
      <Certifications />
      <YouTubeVideos />
      <Feature />
      <FAQ />
      <CTA />
      <Blog />
    </main>
  );
}

