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
      <section className="border-b border-stroke bg-gray-50 py-6 dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-4 text-center">
            <h2 className="mb-2 text-xl font-bold text-black dark:text-white lg:text-2xl">
              Browse Our Products
            </h2>
            <p className="text-sm text-waterloo">
              Find instruments by type or surgical specialty
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/products/by-instrument-type"
              className="group rounded-lg border border-stroke bg-white p-4 transition-all hover:border-primary dark:border-strokedark dark:bg-blacksection"
            >
              <h3 className="mb-2 text-lg font-semibold text-black transition-colors group-hover:text-primary dark:text-white">
                By Instrument Type
              </h3>
              <p className="mb-3 text-sm text-waterloo">
                Browse by instrument category: Scissors, Forceps, Retractors, and more
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                View Categories
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              href="/products/by-surgery-type"
              className="group rounded-lg border border-stroke bg-white p-4 transition-all hover:border-primary dark:border-strokedark dark:bg-blacksection"
            >
              <h3 className="mb-2 text-lg font-semibold text-black transition-colors group-hover:text-primary dark:text-white">
                By Surgery Type
              </h3>
              <p className="mb-3 text-sm text-waterloo">
                Browse by surgical specialty: General, Orthopedic, ENT, Neurosurgery, and more
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                View Categories
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="border-b border-stroke bg-white py-6 dark:border-strokedark dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-4 text-center">
              <h2 className="mb-2 text-xl font-bold text-black dark:text-white lg:text-2xl">
                Featured Products
              </h2>
              <p className="text-sm text-waterloo">
                Explore our most popular surgical instruments
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 rounded border border-primary bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primaryho"
              >
                View All Products
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      
      {/* FAQ and News Side by Side */}
      <section className="border-b border-stroke bg-gray-50 py-8 dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* FAQ Section */}
            <div className="flex flex-col">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white lg:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="flex-1">
                <FAQ />
              </div>
            </div>
            
            {/* News Section */}
            <div className="flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black dark:text-white lg:text-3xl">
                  News
                </h2>
                <button 
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-700"
                  aria-label="RSS Feed"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </button>
              </div>
              <div className="flex-1">
                <Blog />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CTA />
    </main>
  );
}

