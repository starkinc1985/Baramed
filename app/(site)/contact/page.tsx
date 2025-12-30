"use client";

import { Metadata } from "next";
import { useState, useEffect } from "react";
import { useInquiryCart } from "@/context/InquiryCartContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
  const { items, clearInquiry } = useInquiryCart();
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { formData, files, inquiryItems: items });
    // In production, this would send to your backend/email service
  };

  return (
    <main className="pt-20">
      <section className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-linear-to-t from-transparent to-[#dee7ff47] dark:bg-linear-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                {items.length > 0 ? "Request Quote" : "Send a message"}
              </h2>

              {items.length > 0 && (
                <div className="mb-8 rounded-lg border border-stroke bg-gray-50 p-6 dark:border-strokedark dark:bg-blacksection">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      Inquiry Items ({items.length})
                    </h3>
                    <button
                      onClick={clearInquiry}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item.product.id}
                        className="flex items-center justify-between text-sm text-waterloo"
                      >
                        <span>
                          {item.product.name} (Qty: {item.quantity})
                        </span>
                        <span className="font-medium">
                          {item.product.productCode}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Full name *"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="email"
                    placeholder="Email address *"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    placeholder="Phone number *"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />

                  <input
                    type="text"
                    placeholder="Company/Institution"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
                  />
                </div>

                <div className="mb-7.5">
                  <input
                    type="text"
                    placeholder="Subject *"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                  />
                </div>

                <div className="mb-7.5">
                  <textarea
                    placeholder="Message *"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
                  ></textarea>
                </div>

                {/* File Upload */}
                <div className="mb-7.5">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Attach Files (Drawings, Specifications, etc.)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg,.dxf"
                    onChange={handleFileChange}
                    className="w-full border-b border-stroke bg-transparent pb-3.5 text-sm focus:border-waterloo focus-visible:outline-hidden dark:border-strokedark dark:focus:border-manatee"
                  />
                  {files.length > 0 && (
                    <div className="mt-2 text-sm text-waterloo">
                      {files.length} file(s) selected
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-between">
                  <div className="mb-4 flex md:mb-0">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      required
                      className="peer sr-only"
                    />
                    <span className="border-gray-300 bg-gray-100 text-blue-600 dark:border-gray-600 dark:bg-gray-700 group mt-2 flex h-5 min-w-[20px] items-center justify-center rounded-sm peer-checked:bg-primary">
                      <svg
                        className="opacity-0 in-[.group]:peer-checked:opacity-100"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none pl-5 text-sm text-waterloo"
                    >
                      I agree to the privacy policy and terms of service
                    </label>
                  </div>

                  <button
                    type="submit"
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
                  >
                    {items.length > 0 ? "Submit Inquiry" : "Send Message"}
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                Find us
              </h2>

              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Our Location
                </h3>
                <p className="text-waterloo">Germany</p>
                <p className="text-waterloo">BÄRAMED INSTRUMENTE GMBH</p>
              </div>
              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Email Address
                </h3>
                <p className="text-waterloo">
                  <a href="mailto:info@baramed.com" className="hover:text-primary">
                    info@baramed.com
                  </a>
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
                  Phone Number
                </h4>
                <p className="text-waterloo">
                  <a href="tel:+49" className="hover:text-primary">
                    +49 (0) XXX XXX XXXX
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

