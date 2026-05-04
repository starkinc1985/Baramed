"use client";
import SectionHeader from "../Common/SectionHeader";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const card = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const cards = [
  {
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    title: "Precision Manufacturing",
    body: "Advanced CNC machining and precision grinding ensure consistent quality and dimensional accuracy in every instrument.",
  },
  {
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Quality Materials",
    body: "Premium German stainless steel (420, 440C) and high-grade materials that meet medical device standards.",
  },
  {
    icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
    title: "Rigorous Quality Control",
    body: "Every instrument undergoes multiple quality checks including dimensional verification, material testing, and finish inspection.",
  },
  {
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    title: "Custom Solutions",
    body: "OEM/ODM services for custom instrument design and production to meet specific surgical requirements.",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Sterilization Ready",
    body: "All instruments designed and finished to withstand repeated sterilization cycles without degradation.",
  },
  {
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Global Distribution",
    body: "Worldwide distribution network ensuring timely delivery to medical facilities across the globe.",
  },
];

const Manufacturing = () => {
  return (
    <section className="border-b border-stroke bg-sectionalt py-10 dark:border-strokedark dark:bg-darksectionone">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Manufacturing Excellence",
            subtitle: "Made in Germany",
            description:
              "State-of-the-art manufacturing facility combining traditional craftsmanship with modern precision engineering",
          }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              variants={card}
              className="rounded-xl border border-stroke bg-white p-8 shadow-[0_2px_14px_rgba(10,30,100,0.07)] dark:border-strokedark dark:bg-darkcard"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.icon} />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">{c.title}</h3>
              <p className="text-sm text-waterloo">{c.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(0,107,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryho hover:shadow-[0_8px_28px_rgba(0,107,255,0.45)]"
          >
            <span>Learn More About Our Manufacturing</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Manufacturing;
