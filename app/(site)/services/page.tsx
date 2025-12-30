import { Metadata } from "next";
import SectionHeader from "@/components/Common/SectionHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | BÄRAMED INSTRUMENTE GMBH",
  description: "OEM/ODM manufacturing, custom instrument production, and private labeling services",
};

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Our Services
            </h1>
            <p className="mx-auto mb-8 max-w-[800px] text-regular text-waterloo">
              Comprehensive manufacturing solutions for your surgical instrument needs
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* OEM/ODM Manufacturing */}
            <div className="rounded-lg border border-stroke bg-white p-8 shadow-1 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                OEM/ODM Manufacturing
              </h2>
              <p className="mb-6 text-regular text-waterloo">
                We offer comprehensive Original Equipment Manufacturer (OEM) and 
                Original Design Manufacturer (ODM) services. Whether you have a 
                complete design or need assistance developing one, we can manufacture 
                instruments to your exact specifications.
              </p>
              <ul className="mb-6 space-y-2 text-regular text-waterloo">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Custom design and engineering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Prototype development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Production to your specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Quality assurance and testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Regulatory compliance support</span>
                </li>
              </ul>
            </div>

            {/* Custom Instrument Production */}
            <div className="rounded-lg border border-stroke bg-white p-8 shadow-1 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Custom Instrument Production
              </h2>
              <p className="mb-6 text-regular text-waterloo">
                Need a specialized instrument for a unique surgical procedure? 
                Our engineering team works closely with you to design and produce 
                custom instruments that meet your specific requirements.
              </p>
              <ul className="mb-6 space-y-2 text-regular text-waterloo">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Specialized instrument design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Material selection consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Small batch production</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Modifications to existing designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Rapid prototyping</span>
                </li>
              </ul>
            </div>

            {/* Private Labeling */}
            <div className="rounded-lg border border-stroke bg-white p-8 shadow-1 dark:border-strokedark dark:bg-blacksection">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
                Private Labeling
              </h2>
              <p className="mb-6 text-regular text-waterloo">
                Build your brand with our private labeling services. We can 
                manufacture instruments with your branding, packaging, and 
                documentation while maintaining our high quality standards.
              </p>
              <ul className="mb-6 space-y-2 text-regular text-waterloo">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Custom branding and engraving</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Custom packaging solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Branded documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Minimum order flexibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Exclusive distribution rights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-20 lg:py-25 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Our Process",
              subtitle: "How We Work",
              description: "From concept to delivery, we ensure quality at every step",
            }}
          />
          <div className="mt-15 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Consultation
              </h3>
              <p className="text-regular text-waterloo">
                We discuss your requirements and provide expert recommendations
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Design & Prototype
              </h3>
              <p className="text-regular text-waterloo">
                Our team creates designs and prototypes for your approval
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Production
              </h3>
              <p className="text-regular text-waterloo">
                Quality-controlled manufacturing to your specifications
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                4
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                Delivery
              </h3>
              <p className="text-regular text-waterloo">
                Timely delivery with complete documentation and support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="rounded-lg border border-stroke bg-primary/5 p-12 text-center dark:border-strokedark">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-regular text-waterloo">
              Contact us to discuss your OEM/ODM, custom production, or private labeling needs
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-regular font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
            >
              Contact Us
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

