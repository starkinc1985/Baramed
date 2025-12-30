import SectionHeader from "../Common/SectionHeader";
import Link from "next/link";

const Certifications = () => {
  return (
    <section className="bg-gray-50 py-20 lg:py-25 xl:py-30 dark:bg-blacksection">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <SectionHeader
          headerInfo={{
            title: "Certifications & Compliance",
            subtitle: "Quality Assurance",
            description: "Our certifications demonstrate our commitment to quality and regulatory compliance",
          }}
        />

        <div className="mt-15 grid grid-cols-2 gap-7.5 md:grid-cols-3 lg:grid-cols-6 xl:gap-10">
          <div className="rounded-lg border border-stroke bg-white p-6 text-center shadow-1 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4 text-3xl font-bold text-primary">ISO 13485</div>
            <p className="text-sm text-waterloo">Medical Devices QMS</p>
          </div>

          <div className="rounded-lg border border-stroke bg-white p-6 text-center shadow-1 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4 text-3xl font-bold text-primary">ISO 9001</div>
            <p className="text-sm text-waterloo">Quality Management</p>
          </div>

          <div className="rounded-lg border border-stroke bg-white p-6 text-center shadow-1 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4 text-3xl font-bold text-primary">CE</div>
            <p className="text-sm text-waterloo">CE Marking</p>
          </div>

          <div className="rounded-lg border border-stroke bg-white p-6 text-center shadow-1 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4 text-3xl font-bold text-primary">MDR</div>
            <p className="text-sm text-waterloo">MDR Compliant</p>
          </div>

          <div className="rounded-lg border border-stroke bg-white p-6 text-center shadow-1 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4 text-3xl font-bold text-primary">FDA</div>
            <p className="text-sm text-waterloo">FDA Registered</p>
          </div>

          <div className="rounded-lg border border-stroke bg-white p-6 text-center shadow-1 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4 text-3xl font-bold text-primary">GMP</div>
            <p className="text-sm text-waterloo">Good Manufacturing Practice</p>
          </div>
        </div>

        <div className="mt-15 text-center">
          <Link
            href="/quality-compliance"
            className="inline-flex items-center gap-2 text-primary hover:underline"
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

