import { Metadata } from "next";
import SectionHeader from "@/components/Common/SectionHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Downloads | BÄRAMED INSTRUMENTE GMBH",
  description: "Download our product catalogs, certificates, brochures, and instructions for use",
};

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  category: "catalog" | "certificate" | "brochure" | "ifu";
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

const downloads: DownloadItem[] = [
  {
    id: "1",
    title: "Complete Product Catalog 2024",
    description: "Comprehensive catalog featuring all our surgical instruments",
    category: "catalog",
    fileSize: "15.2 MB",
    fileType: "PDF",
    downloadUrl: "/downloads/catalog-2024.pdf",
  },
  {
    id: "2",
    title: "ISO 13485 Certificate",
    description: "Medical Devices Quality Management System Certificate",
    category: "certificate",
    fileSize: "2.1 MB",
    fileType: "PDF",
    downloadUrl: "/downloads/iso-13485.pdf",
  },
  {
    id: "3",
    title: "ISO 9001 Certificate",
    description: "Quality Management System Certificate",
    category: "certificate",
    fileSize: "1.8 MB",
    fileType: "PDF",
    downloadUrl: "/downloads/iso-9001.pdf",
  },
  {
    id: "4",
    title: "CE Declaration of Conformity",
    description: "European Conformity Declaration for Medical Devices",
    category: "certificate",
    fileSize: "1.5 MB",
    fileType: "PDF",
    downloadUrl: "/downloads/ce-declaration.pdf",
  },
  {
    id: "5",
    title: "Company Brochure",
    description: "Overview of our company, capabilities, and services",
    category: "brochure",
    fileSize: "8.5 MB",
    fileType: "PDF",
    downloadUrl: "/downloads/company-brochure.pdf",
  },
  {
    id: "6",
    title: "Scissors - Instructions for Use",
    description: "IFU for all types of surgical scissors",
    category: "ifu",
    fileSize: "3.2 MB",
    fileType: "PDF",
    downloadUrl: "/downloads/ifu-scissors.pdf",
  },
  {
    id: "7",
    title: "Forceps - Instructions for Use",
    description: "IFU for all types of surgical forceps",
    category: "ifu",
    fileSize: "2.9 MB",
    fileType: "PDF",
    downloadUrl: "/downloads/ifu-forceps.pdf",
  },
  {
    id: "8",
    title: "Retractors - Instructions for Use",
    description: "IFU for all types of surgical retractors",
    category: "ifu",
    fileSize: "3.5 MB",
    fileType: "PDF",
    downloadUrl: "/downloads/ifu-retractors.pdf",
  },
];

const categoryLabels = {
  catalog: "Product Catalog",
  certificate: "Certificates",
  brochure: "Brochures",
  ifu: "Instructions for Use",
};

export default function DownloadsPage() {
  const groupedDownloads = downloads.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, DownloadItem[]>);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-20 lg:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="text-center">
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Downloads
            </h1>
            <p className="mx-auto mb-8 max-w-[800px] text-regular text-waterloo">
              Access our product catalogs, certificates, brochures, and instructions for use
            </p>
          </div>
        </div>
      </section>

      {/* Downloads by Category */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {Object.entries(groupedDownloads).map(([category, items]) => (
            <div key={category} className="mb-15">
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-stroke bg-white p-6 shadow-1 dark:border-strokedark dark:bg-blacksection"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mb-4 text-sm text-waterloo">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 flex items-center gap-4 text-sm text-waterloo">
                      <span>{item.fileSize}</span>
                      <span>•</span>
                      <span>{item.fileType}</span>
                    </div>
                    <a
                      href={item.downloadUrl}
                      download
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-transparent px-6 py-3 text-regular font-medium text-primary duration-300 ease-in-out hover:bg-primary/10"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 lg:py-25">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div className="rounded-lg border border-stroke bg-primary/5 p-12 text-center dark:border-strokedark">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Need Additional Documentation?
            </h2>
            <p className="mb-8 text-regular text-waterloo">
              Contact us if you need specific certificates, technical drawings, or other documentation
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-regular font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

