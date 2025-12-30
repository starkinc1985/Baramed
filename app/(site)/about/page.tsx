import { Metadata } from "next";
import SectionHeader from "@/components/Common/SectionHeader";

export const metadata: Metadata = {
  title: "About Us | BÄRAMED INSTRUMENTE GMBH",
  description: "Learn about BÄRAMED INSTRUMENTE GMBH - German manufacturer of premium surgical instruments",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              About BÄRAMED INSTRUMENTE GMBH
            </h1>
            <p className="mx-auto mb-8 max-w-[800px] text-regular text-waterloo">
              Leading German manufacturer of high-quality surgical instruments
            </p>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                Company Profile
              </h2>
              <div className="space-y-4 text-regular text-waterloo">
                <p>
                  BÄRAMED INSTRUMENTE GMBH is a leading German manufacturer specializing 
                  in the production of high-quality surgical instruments for medical professionals 
                  worldwide. With our state-of-the-art manufacturing facility in Germany, we combine 
                  traditional craftsmanship with modern precision engineering.
                </p>
                <p>
                  Our commitment to excellence and adherence to the highest quality standards has 
                  established us as a trusted partner for hospitals, clinics, and medical institutions 
                  across the globe. We understand that surgical instruments are critical tools that 
                  directly impact patient outcomes, which is why we never compromise on quality.
                </p>
                <p>
                  Every instrument we produce undergoes rigorous quality control processes to ensure 
                  it meets or exceeds international standards including ISO 13485, CE marking, and MDR 
                  compliance requirements.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Key Facts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="h-6 w-6 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-regular text-waterloo">ISO 13485 & ISO 9001 Certified</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-6 w-6 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-regular text-waterloo">CE Marked & MDR Compliant</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-6 w-6 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-regular text-waterloo">Manufacturing in Germany</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-6 w-6 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-regular text-waterloo">Global Distribution Network</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-6 w-6 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-regular text-waterloo">OEM/ODM Capabilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="bg-gray-50 py-20 lg:py-25 dark:bg-blacksection">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <SectionHeader
            headerInfo={{
              title: "Manufacturing Capabilities",
              subtitle: "Precision Engineering",
              description: "Our state-of-the-art facility combines traditional craftsmanship with modern technology",
            }}
          />
          <div className="mt-15 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Precision Manufacturing
              </h3>
              <p className="text-regular text-waterloo">
                Advanced CNC machining and precision grinding ensure consistent quality 
                and dimensional accuracy in every instrument we produce.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Quality Materials
              </h3>
              <p className="text-regular text-waterloo">
                We use only premium German stainless steel (420, 440C) and other 
                high-grade materials that meet medical device standards.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Quality Control
              </h3>
              <p className="text-regular text-waterloo">
                Every instrument undergoes multiple quality checks including dimensional 
                verification, material testing, and finish inspection.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Custom Solutions
              </h3>
              <p className="text-regular text-waterloo">
                Our OEM/ODM services allow for custom instrument design and production 
                to meet specific surgical requirements.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Sterilization Ready
              </h3>
              <p className="text-regular text-waterloo">
                All instruments are designed and finished to withstand repeated 
                sterilization cycles without degradation.
              </p>
            </div>
            <div className="rounded-lg border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
              <h3 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Global Reach
              </h3>
              <p className="text-regular text-waterloo">
                Our distribution network spans across continents, ensuring timely 
                delivery to medical facilities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="mx-auto max-w-[800px]">
            <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
              Our History
            </h2>
            <div className="space-y-4 text-regular text-waterloo">
              <p>
                Founded with a vision to provide medical professionals with the finest 
                surgical instruments, BÄRAMED INSTRUMENTE GMBH has grown from a small 
                German workshop to an internationally recognized manufacturer.
              </p>
              <p>
                Our journey has been marked by continuous investment in technology, 
                quality systems, and our people. We have built long-term relationships 
                with medical institutions worldwide, understanding their needs and 
                delivering solutions that exceed expectations.
              </p>
              <p>
                Today, we continue to innovate while maintaining our commitment to 
                the highest standards of quality, precision, and reliability that 
                medical professionals depend on.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

