"use client";
import SectionHeader from "../Common/SectionHeader";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const badge = {
  hidden: { opacity: 0, scale: 0.82, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "backOut" as const },
  },
};

const certs = [
  { code: "ISO 13485", label: "Medical Devices QMS" },
  { code: "ISO 9001",  label: "Quality Management" },
  { code: "CE",        label: "CE Marking" },
  { code: "MDR",       label: "MDR Compliant" },
  { code: "FDA",       label: "FDA Registered" },
  { code: "GMP",       label: "Good Manufacturing Practice" },
];

const Certifications = () => {
  return (
    <section className="border-b border-stroke bg-white py-10 dark:border-strokedark dark:bg-darksectiontwo">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Certifications & Compliance",
            subtitle: "Quality Assurance",
            description:
              "Our certifications demonstrate our commitment to quality and regulatory compliance",
          }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
        >
          {certs.map((cert) => (
            <motion.div
              key={cert.code}
              variants={badge}
              className="rounded-xl border border-stroke bg-sectionalt p-5 text-center shadow-[0_2px_10px_rgba(10,30,100,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_6px_20px_rgba(0,107,255,0.12)] dark:border-strokedark dark:bg-darkcard"
            >
              <div className="mb-2 text-2xl font-bold text-primary">{cert.code}</div>
              <p className="text-xs text-waterloo">{cert.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 text-center">
          <Link
            href="/quality-compliance"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
          >
            View All Certificates
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
