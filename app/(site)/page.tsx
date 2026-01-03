import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import Manufacturing from "@/components/Manufacturing";
import Certifications from "@/components/Certifications";
import YouTubeVideos from "@/components/YouTubeVideos";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import { getFeaturedProducts, sampleProducts } from "@/data/products";
import Link from "next/link";
import ProductCard from "@/components/Product/ProductCard";

export const metadata: Metadata = {
  title: "BÄRAMED INSTRUMENTE GMBH - Premium Surgical Instruments",
  description: "Leading German manufacturer of high-quality surgical instruments. ISO 13485 certified, CE marked, and MDR compliant.",
};

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  // Combine featured products with additional products to show at least 6 products
  const displayProducts = featuredProducts.length > 0
    ? [
        ...featuredProducts,
        ...sampleProducts.filter(p => !p.featured).slice(0, Math.max(0, 6 - featuredProducts.length))
      ]
    : sampleProducts.slice(0, 6);

  return (
    <main>
      <Hero />
      
      {/* Quick Navigation to Categories */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12 dark:from-blacksection dark:to-slate-900">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
              Product Navigation
            </div>
            <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
              Browse Our Products
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
              Find instruments by type or surgical specialty. Explore our comprehensive catalog of precision surgical instruments.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/products/by-instrument-type"
              className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
              <div className="relative z-10">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                  By Instrument Type
                </h3>
                <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  Browse by instrument category: Scissors, Forceps, Retractors, and more. Find the perfect tool for your surgical needs.
                </p>
                <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all group-hover:scale-105">
                  View Categories
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            <Link
              href="/products/by-surgery-type"
              className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl"></div>
              <div className="relative z-10">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                  By Surgery Type
                </h3>
                <p className="mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  Browse by surgical specialty: General, Orthopedic, ENT, Neurosurgery, and more. Find instruments for your specific procedure.
                </p>
                <span className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all group-hover:scale-105">
                  View Categories
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {displayProducts.length > 0 && (
        <section className="bg-white py-12 dark:bg-blacksection">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <div className="mb-8 text-center">
              <div className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                Featured Selection
              </div>
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                Featured Products
              </h2>
              <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-400">
                Explore our most popular surgical instruments, handpicked for their quality and reliability
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {displayProducts.slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primaryho hover:shadow-xl hover:shadow-primary/30"
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
      
      {/* FAQ and News Side by Side */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-900 dark:to-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* FAQ Section */}
            <div className="flex flex-col">
              <div className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary w-fit">
                FAQ
              </div>
              <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="flex-1">
                <FAQ />
              </div>
            </div>
            
            {/* News Section */}
            <div className="flex flex-col">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="mb-2 inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 w-fit">
                    NEWS
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
                    News
                  </h2>
                </div>
                <button 
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-emerald-700 hover:shadow-xl"
                  aria-label="RSS Feed"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
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

