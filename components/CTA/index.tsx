"use client";
import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section className="border-b border-stroke py-10 dark:border-strokedark">
        <div className="mx-auto max-w-c-1390 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0057d9] via-[#006bff] to-[#0ea5e9] px-8 py-10 shadow-[0_20px_60px_rgba(0,107,255,0.3)] md:px-12 xl:px-16 xl:py-14">
          {/* Decorative blobs inside CTA */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/8 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-white/6 blur-2xl"></div>

          <div className="relative flex flex-wrap gap-8 md:flex-nowrap md:items-center md:justify-between md:gap-0">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:w-[65%] lg:w-1/2"
            >
              <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                Partner With Us
              </span>
              <h2 className="mb-4 w-11/12 text-3xl font-bold text-white xl:text-sectiontitle4">
                Partner With Bäramed & Elevate Your Surgical Practice
              </h2>
              <p className="text-white/80">
                Discover our comprehensive range of precision surgical instruments. Contact us today to learn more about our products and how we can support your healthcare facility.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-start gap-4 md:justify-end lg:w-[45%]"
            >
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3 font-semibold text-primary shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span>Get in Touch</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
              </a>
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/20"
              >
                Browse Products
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== CTA End ===== --> */}
    </>
  );
};

export default CTA;
