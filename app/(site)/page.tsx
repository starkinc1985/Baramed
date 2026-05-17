import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import Manufacturing from "@/components/Manufacturing";
import Certifications from "@/components/Certifications";
import YouTubeVideos from "@/components/YouTubeVideos";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import { getFeaturedProductsFromDb } from "@/lib/catalog";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models/Faq";
import Link from "next/link";
import ProductCard from "@/components/Product/ProductCard";
import AnimateOnScroll from "@/components/Common/AnimateOnScroll";

export const metadata: Metadata = {
  title: "BÄRAMED INSTRUMENTE GMBH - Premium Surgical Instruments",
  description:
    "Leading German manufacturer of high-quality surgical instruments. ISO 13485 certified, CE marked, and MDR compliant.",
};

export default async function Home() {
  await connectDB();
  const [featuredProducts, rawFaqs] = await Promise.all([
    getFeaturedProductsFromDb(4),
    Faq.find({ published: true }).sort({ sortOrder: 1 }).lean(),
  ]);
  const faqs = (rawFaqs as any[]).map((f) => ({
    id: f._id.toString(),
    question: f.question,
    answer: f.answer,
  }));

  return (
    <main>
      <Hero />

      {/* Quick Navigation to Categories */}
      <section className="border-b border-stroke bg-sectionalt py-10 dark:border-strokedark dark:bg-darksectionone">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <AnimateOnScroll animation="fadeUp" className="mb-8 text-center">
            <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Product Catalogue
            </span>
            <h2 className="mb-2 text-2xl font-bold text-black dark:text-white lg:text-3xl">
              Browse Our Products
            </h2>
            <p className="text-sm text-waterloo">
              Find instruments by type or surgical specialty
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <AnimateOnScroll animation="fadeLeft" delay={0.05}>
              <Link
                href="/products/by-instrument-type"
                className="group relative block overflow-hidden rounded-xl border border-stroke bg-white p-6 shadow-solid-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(0,107,255,0.12)] dark:border-strokedark dark:bg-darkcard"
              >
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-primary to-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-black transition-colors group-hover:text-primary dark:text-white">By Instrument Type</h3>
                <p className="mb-4 text-sm text-waterloo">Browse by instrument category: Scissors, Forceps, Retractors, and more</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  View Categories
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeRight" delay={0.05}>
              <Link
                href="/products/by-surgery-type"
                className="group relative block overflow-hidden rounded-xl border border-stroke bg-white p-6 shadow-solid-2 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(0,107,255,0.12)] dark:border-strokedark dark:bg-darkcard"
              >
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-meta to-meta/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-meta/10 text-meta transition-colors duration-300 group-hover:bg-meta group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-black transition-colors group-hover:text-meta dark:text-white">By Surgery Type</h3>
                <p className="mb-4 text-sm text-waterloo">Browse by surgical specialty: General, Orthopedic, ENT, Neurosurgery, and more</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-meta">
                  View Categories
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="border-b border-stroke bg-white py-12 dark:border-strokedark dark:bg-darksectiontwo">
          <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
            <AnimateOnScroll animation="fadeUp" className="mb-8 text-center">
              <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Top Picks
              </span>
              <h2 className="mb-2 text-2xl font-bold text-black dark:text-white lg:text-3xl">Featured Products</h2>
              <p className="text-sm text-waterloo">Explore our most popular surgical instruments</p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.slice(0, 4).map((product, i) => (
                <AnimateOnScroll key={product.id} animation="fadeUp" delay={i * 0.1}>
                  <ProductCard product={product} className="h-full" />
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll animation="fadeUp" delay={0.2} className="mt-8 text-center">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(0,107,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryho hover:shadow-[0_8px_28px_rgba(0,107,255,0.45)]"
              >
                <span>View All Products</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      <Manufacturing />
      <Certifications />
      <YouTubeVideos />
      <Feature />

      {/* FAQ and News */}
      <section className="border-b border-stroke bg-white py-8 dark:border-strokedark dark:bg-darksectiontwo">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <AnimateOnScroll animation="fadeLeft">
              <div className="flex flex-col">
                <h2 className="mb-6 text-2xl font-bold text-black dark:text-white lg:text-3xl">
                  Frequently Asked Questions
                </h2>
                <div className="flex-1">
                  <FAQ faqs={faqs} />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeRight" delay={0.1}>
              <div className="flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-black dark:text-white lg:text-3xl">News</h2>
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
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
