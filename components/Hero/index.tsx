"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const badges = [
  { label: "ISO 13485 Certified" },
  { label: "CE Marked" },
  { label: "MDR Compliant" },
];


const Hero = () => {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 md:pt-44 xl:pb-32 xl:pt-52">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/HomepageImages/Surgical-Instruments-Main-1.webp"
          alt="Surgical Instruments Background"
          fill
          priority
          className="object-cover"
        />
        {/* Base light wash */}
        <div className="absolute inset-0 bg-white/40 dark:bg-black/50"></div>
        {/* Left-to-right fade: readable left, image shows right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/15 dark:from-black/92 dark:via-black/65 dark:to-black/10"></div>
        {/* Bottom fade so section has a clean edge */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bodybg to-transparent dark:from-darkbody"></div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 right-10 -z-10 h-96 w-96 animate-float rounded-full bg-primary/6 blur-3xl dark:bg-primary/10"></div>
      <div className="absolute bottom-10 left-10 -z-10 h-64 w-64 rounded-full bg-meta/6 blur-3xl dark:bg-meta/10"></div>

      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="flex flex-col">

          {/* Content */}
          <div className="w-full max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4.5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-primary"
            >
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary"></span>
              Bäramed Instrumente GmbH
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero"
            >
              Precision Surgical{" "}
              <span className="relative inline-block text-primary">
                Instruments
                <motion.span
                  className="absolute -bottom-1 left-0 h-1 rounded-full bg-primary/30"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
                />
              </span>{" "}
              <br className="hidden xl:block" />
              Made in Germany
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mb-8 max-w-[500px] text-regular text-waterloo"
            >
              Leading German manufacturer of high-quality surgical instruments.
              ISO 13485 certified, CE marked, and MDR compliant. Trusted by
              medical professionals worldwide for precision, reliability, and
              excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.46 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/products"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7.5 py-2.5 font-medium text-white shadow-[0_4px_18px_rgba(0,107,255,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryho hover:shadow-[0_8px_28px_rgba(0,107,255,0.45)]"
              >
                <span>Browse Products</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full border-2 border-primary bg-transparent px-7.5 py-2.5 font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-[0_8px_24px_rgba(0,107,255,0.3)]"
              >
                <span>Request Quote</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {badges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
                >
                  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge.label}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
