"use client";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-16 md:py-24 lg:py-32 dark:from-slate-900 dark:via-slate-800 dark:to-blacksection">
      {/* Background Image with better overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/HomepageImages/Surgical-Instruments-Main-1.webp"
          alt="Surgical Instruments Background"
          fill
          priority
          className="object-cover opacity-70 dark:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-transparent dark:from-slate-900/90 dark:via-slate-900/80"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl"></div>

      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
          <div className="w-full lg:w-1/2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary dark:bg-primary/20">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14 2.984l1.033-.244A1 1 0 0116 2a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              BÄRAMED INSTRUMENTE GMBH
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl xl:text-7xl">
              Precision Surgical Instruments
              <span className="block mt-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Made in Germany
              </span>
            </h1>
            
            <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
              Leading German manufacturer of high-quality surgical instruments. 
              ISO 13485 certified, CE marked, and MDR compliant. Trusted by medical 
              professionals worldwide for precision, reliability, and excellence.
            </p>

            <div className="mb-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:bg-primaryho hover:shadow-xl hover:shadow-primary/30"
              >
                Browse Products
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-white px-6 py-3.5 text-base font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white dark:bg-slate-800 dark:hover:bg-primary"
              >
                Request Quote
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2.5 rounded-lg bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm dark:bg-slate-800/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">ISO 13485</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm dark:bg-slate-800/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">CE Marked</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm dark:bg-slate-800/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">MDR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
