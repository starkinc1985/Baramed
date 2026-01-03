import SectionHeader from "../Common/SectionHeader";
import Link from "next/link";

const Certifications = () => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-12 dark:from-slate-900 dark:to-blacksection">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Certifications & Compliance",
            subtitle: "Quality Assurance",
            description: "Our certifications demonstrate our commitment to quality and regulatory compliance",
          }}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div className="group rounded-xl border-2 border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 text-3xl font-bold text-primary transition-colors group-hover:text-primaryho">ISO 13485</div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Medical Devices QMS</p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 text-3xl font-bold text-primary transition-colors group-hover:text-primaryho">ISO 9001</div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Quality Management</p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 text-3xl font-bold text-primary transition-colors group-hover:text-primaryho">CE</div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">CE Marking</p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 text-3xl font-bold text-primary transition-colors group-hover:text-primaryho">MDR</div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">MDR Compliant</p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 text-3xl font-bold text-primary transition-colors group-hover:text-primaryho">FDA</div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">FDA Registered</p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-3 text-3xl font-bold text-primary transition-colors group-hover:text-primaryho">GMP</div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Good Manufacturing Practice</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/quality-compliance"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-transparent px-6 py-3 text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-lg"
          >
            View All Certificates
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

