import SectionHeader from "../Common/SectionHeader";
import Link from "next/link";

const Manufacturing = () => {
  return (
    <section className="bg-white py-12 dark:bg-blacksection">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Manufacturing Excellence",
            subtitle: "Made in Germany",
            description: "State-of-the-art manufacturing facility combining traditional craftsmanship with modern precision engineering",
          }}
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              Precision Manufacturing
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Advanced CNC machining and precision grinding ensure consistent quality 
              and dimensional accuracy in every instrument.
            </p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              Quality Materials
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Premium German stainless steel (420, 440C) and high-grade materials 
              that meet medical device standards.
            </p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              Rigorous Quality Control
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Every instrument undergoes multiple quality checks including dimensional 
              verification, material testing, and finish inspection.
            </p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              Custom Solutions
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              OEM/ODM services for custom instrument design and production to meet 
              specific surgical requirements.
            </p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              Sterilization Ready
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              All instruments designed and finished to withstand repeated sterilization 
              cycles without degradation.
            </p>
          </div>

          <div className="group rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <svg className="h-7 w-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
              Global Distribution
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Worldwide distribution network ensuring timely delivery to medical 
              facilities across the globe.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primaryho hover:shadow-xl hover:shadow-primary/30"
          >
            Learn More About Our Manufacturing
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Manufacturing;

