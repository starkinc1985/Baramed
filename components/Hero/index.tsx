"use client";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/HomepageImages/Surgical-Instruments-Main-1.webp"
            alt="Surgical Instruments Background"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/85 dark:bg-black/75"></div>
        </div>

        <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="w-full lg:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                BÄRAMED INSTRUMENTE GMBH
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Precision Surgical Instruments {"   "}
                <span className="text-primary">
                  Made in Germany
                </span>
              </h1>
              <p className="mb-8 text-regular text-waterloo">
                Leading German manufacturer of high-quality surgical instruments. 
                ISO 13485 certified, CE marked, and MDR compliant. Trusted by medical 
                professionals worldwide for precision, reliability, and excellence.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  href="/products"
                  className="flex rounded-full bg-primary px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-primaryho"
                >
                  Browse Products
                </Link>
                <Link
                  href="/contact"
                  className="flex rounded-full border border-primary bg-transparent px-7.5 py-2.5 text-primary duration-300 ease-in-out hover:bg-primary/10"
                >
                  Request Quote
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-waterloo">ISO 13485 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-waterloo">CE Marked</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-waterloo">MDR Compliant</span>
                </div>
              </div>
            </div>

            {/* Optional: Keep image visible on larger screens if needed, or remove this section */}
            <div className="mt-10 hidden lg:block lg:w-1/2">
              <div className="relative aspect-700/444 w-full overflow-hidden rounded-lg shadow-solid-l">
                <Image
                  className="object-cover"
                  src="/images/HomepageImages/Surgical-Instruments-Main-1.webp"
                  alt="Surgical Instruments"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
