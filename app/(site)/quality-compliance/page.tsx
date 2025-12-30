import { Metadata } from "next";
import SectionHeader from "@/components/Common/SectionHeader";

export const metadata: Metadata = {
  title: "Quality & Compliance | BÄRAMED INSTRUMENTE GMBH",
  description: "Learn about our quality standards, certifications, and regulatory compliance",
};

export default function QualityCompliancePage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Quality & Compliance
            </h1>
            <p className="mx-auto mb-8 max-w-[800px] text-regular text-waterloo">
              Committed to the highest standards of quality and regulatory compliance
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Certifications & Standards",
              subtitle: "Quality Assurance",
              description: "Our certifications demonstrate our commitment to quality and regulatory compliance",
            }}
          />
          <div className="mt-15 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-4 text-4xl font-bold text-primary">ISO 13485</div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Medical Devices Quality Management
              </h3>
              <p className="text-regular text-waterloo">
                Certified to ISO 13485:2016, ensuring our quality management system 
                meets the specific requirements for medical device manufacturing.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-4 text-4xl font-bold text-primary">ISO 9001</div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Quality Management System
              </h3>
              <p className="text-regular text-waterloo">
                Our comprehensive quality management system ensures consistent 
                product quality and continuous improvement.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-4 text-4xl font-bold text-primary">CE</div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                CE Marking
              </h3>
              <p className="text-regular text-waterloo">
                All our products carry CE marking, indicating compliance with 
                European health, safety, and environmental protection standards.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-4 text-4xl font-bold text-primary">MDR</div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Medical Device Regulation
              </h3>
              <p className="text-regular text-waterloo">
                Full compliance with EU Medical Device Regulation (MDR) 2017/745, 
                ensuring the highest level of patient safety and device performance.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-4 text-4xl font-bold text-primary">FDA</div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                FDA Registration
              </h3>
              <p className="text-regular text-waterloo">
                Registered with the U.S. Food and Drug Administration, meeting 
                requirements for medical device manufacturing and distribution.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-4 text-4xl font-bold text-primary">GMP</div>
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Good Manufacturing Practice
              </h3>
              <p className="text-regular text-waterloo">
                Adherence to Good Manufacturing Practice guidelines ensures 
                consistent quality and safety in our manufacturing processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="bg-gray-50 py-20 lg:py-25 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Quality Standards",
              subtitle: "Our Commitment",
              description: "Every instrument is manufactured to meet or exceed international quality standards",
            }}
          />
          <div className="mt-15 space-y-6">
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Material Standards
              </h3>
              <p className="mb-4 text-regular text-waterloo">
                We use only premium materials that meet medical device standards:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-regular text-waterloo">
                <li>German Stainless Steel 420 and 440C</li>
                <li>ASTM F899 compliant materials</li>
                <li>Biocompatible materials for patient safety</li>
                <li>Corrosion-resistant finishes</li>
              </ul>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Manufacturing Processes
              </h3>
              <p className="mb-4 text-regular text-waterloo">
                Our manufacturing processes are designed to ensure precision and consistency:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-regular text-waterloo">
                <li>CNC precision machining</li>
                <li>Precision grinding and finishing</li>
                <li>Heat treatment for optimal hardness</li>
                <li>Passivation for corrosion resistance</li>
                <li>Final inspection and quality control</li>
              </ul>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Quality Control
              </h3>
              <p className="mb-4 text-regular text-waterloo">
                Every instrument undergoes rigorous quality control:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-regular text-waterloo">
                <li>Dimensional verification</li>
                <li>Material composition testing</li>
                <li>Surface finish inspection</li>
                <li>Functional testing</li>
                <li>Sterilization compatibility verification</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Regulatory Compliance",
              subtitle: "Global Standards",
              description: "We ensure compliance with regulations in all markets we serve",
            }}
          />
          <div className="mt-15 grid grid-cols-1 gap-7.5 md:grid-cols-2 xl:gap-10">
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                European Union (EU)
              </h3>
              <ul className="space-y-2 text-regular text-waterloo">
                <li>• MDR 2017/745 Compliance</li>
                <li>• CE Marking</li>
                <li>• Technical Documentation</li>
                <li>• Post-Market Surveillance</li>
              </ul>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                United States (USA)
              </h3>
              <ul className="space-y-2 text-regular text-waterloo">
                <li>• FDA Registration</li>
                <li>• Quality System Regulation (QSR)</li>
                <li>• Medical Device Reporting</li>
              </ul>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Documentation
              </h3>
              <ul className="space-y-2 text-regular text-waterloo">
                <li>• Technical Files</li>
                <li>• Risk Management Files</li>
                <li>• Clinical Evaluation Reports</li>
                <li>• Instructions for Use (IFU)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Traceability
              </h3>
              <ul className="space-y-2 text-regular text-waterloo">
                <li>• Unique Device Identification (UDI)</li>
                <li>• Batch/Lot Tracking</li>
                <li>• Material Traceability</li>
                <li>• Manufacturing Records</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

