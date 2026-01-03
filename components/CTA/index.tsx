"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <>
      {/* <!-- ===== CTA Start ===== --> */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-primary-dark py-16 dark:from-primary-dark dark:via-primary dark:to-blue-700">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
        
        <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 xl:px-12">
          <div className="flex flex-wrap items-center gap-8 md:flex-nowrap md:justify-between">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:w-[70%] lg:w-1/2"
            >
              <h2 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-4xl xl:text-5xl">
                Partner With Bäramed & Elevate Your Surgical Practice
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                Discover our comprehensive range of precision surgical instruments. Contact us today to learn more about our products and how we can support your healthcare facility.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:w-[45%]"
            >
              <div className="flex items-center justify-end xl:justify-between">
                <Image
                  width={299}
                  height={299}
                  src="/images/shape/shape-06.png"
                  alt="Saly"
                  className="hidden xl:block opacity-20"
                />
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-bold text-primary shadow-2xl transition-all hover:scale-105 hover:shadow-3xl"
                >
                  Get Started
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== CTA End ===== --> */}
    </>
  );
};

export default CTA;
