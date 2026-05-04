import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sampleProducts } from "@/data/products";
import {
  instrumentTypeCategories,
  surgeryTypeCategories,
} from "@/data/categories";

type AnyCategory = {
  name: string;
  slug: string;
  description?: string;
  subcategories?: { name: string; slug: string; description?: string }[];
};

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  // Clear in safe order
  await prisma.inquiryAttachment.deleteMany();
  await prisma.inquiryItem.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productSpec.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.download.deleteMany();
  await prisma.video.deleteMany();

  // ── Categories ────────────────────────────────────────────────────────────
  async function createCategoryTree(
    type: "INSTRUMENT" | "SURGERY",
    cats: AnyCategory[],
  ) {
    for (const c of cats) {
      const parent = await prisma.category.create({
        data: {
          type,
          name: c.name,
          slug: c.slug,
          description: c.description ?? null,
        },
      });

      if (Array.isArray(c.subcategories)) {
        for (const s of c.subcategories) {
          await prisma.category.create({
            data: {
              type,
              name: s.name,
              slug: s.slug,
              description: s.description ?? null,
              parentId: parent.id,
            },
          });
        }
      }
    }
  }

  await createCategoryTree(
    "INSTRUMENT",
    instrumentTypeCategories as unknown as AnyCategory[],
  );
  await createCategoryTree(
    "SURGERY",
    surgeryTypeCategories as unknown as AnyCategory[],
  );

  const categories = await prisma.category.findMany();
  const categoryIdBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  // ── Products ──────────────────────────────────────────────────────────────
  for (const p of sampleProducts as any[]) {
    const created = await prisma.product.create({
      data: {
        name: p.name,
        productCode: p.productCode,
        shortDescription: p.shortDescription ?? null,
        description: p.description,
        featured: !!p.featured,
        inStock: p.inStock !== false,
        images: {
          create: (p.images ?? []).map((url: string, idx: number) => ({
            url,
            sortOrder: idx,
          })),
        },
        specs: {
          create: Object.entries(p.specifications ?? {}).map(([key, value]) => ({
            key,
            value: String(value),
          })),
        },
      },
    });

    const slugs = new Set<string>();
    if (typeof p.category === "string") slugs.add(p.category);
    if (typeof p.subcategory === "string") slugs.add(p.subcategory);
    if (Array.isArray(p.surgeryTypes)) {
      for (const st of p.surgeryTypes) if (typeof st === "string") slugs.add(st);
    }

    for (const slug of slugs) {
      const categoryId = categoryIdBySlug.get(slug);
      if (!categoryId) continue;
      await prisma.productCategory.create({
        data: { productId: created.id, categoryId },
      });
    }
  }

  // ── Blog Posts ────────────────────────────────────────────────────────────
  const blogPosts = [
    {
      title: "Announcing the Launch of Our New Website 2024",
      slug: "announcing-new-website-2024",
      excerpt:
        "We are very excited to announce the launch of our newly designed website. After months of hard work, we're proud to present an improved platform for browsing our comprehensive range of surgical instruments.",
      content:
        "We are very excited to announce the launch of our newly designed website. After months of hard work, we're proud to present an improved platform for browsing our comprehensive range of surgical instruments. The new site features improved navigation, detailed product specifications, and a streamlined inquiry process.",
      coverImage: "/images/blog/blog-01.png",
      author: "BÄRAMED Team",
      tags: ["news", "website"],
      published: true,
      publishedAt: new Date("2024-01-15"),
    },
    {
      title: "Company Statement on Quality Standards",
      slug: "company-quality-standards",
      excerpt:
        "At Bäramed Instruments, our founding principle has always been driven to help improve patient health outcomes through precision manufacturing and rigorous quality control processes.",
      content:
        "At Bäramed Instruments, our founding principle has always been driven to help improve patient health outcomes through precision manufacturing and rigorous quality control processes. Every instrument we produce undergoes stringent quality checks before leaving our facility.",
      coverImage: "/images/blog/blog-02.png",
      author: "Quality Team",
      tags: ["quality", "standards"],
      published: true,
      publishedAt: new Date("2024-03-10"),
    },
    {
      title: "New ISO 13485:2016 Certification Achieved",
      slug: "iso-13485-certification",
      excerpt:
        "We are pleased to announce that Bäramed Instruments has successfully achieved ISO 13485:2016 certification, demonstrating our commitment to medical device quality management.",
      content:
        "We are pleased to announce that Bäramed Instruments has successfully achieved ISO 13485:2016 certification, demonstrating our commitment to medical device quality management. This certification validates our quality management system and our dedication to producing safe, effective surgical instruments.",
      coverImage: "/images/blog/blog-03.png",
      author: "Compliance Team",
      tags: ["certification", "ISO", "quality"],
      published: true,
      publishedAt: new Date("2024-05-20"),
    },
    {
      title: "Expanding Our Global Distribution Network",
      slug: "expanding-global-distribution",
      excerpt:
        "Bäramed Instruments is expanding its global reach with new distribution partnerships in key markets, ensuring timely delivery of high-quality surgical instruments worldwide.",
      content:
        "Bäramed Instruments is expanding its global reach with new distribution partnerships in key markets, ensuring timely delivery of high-quality surgical instruments worldwide. Our new distribution network covers Europe, Asia, and the Americas.",
      coverImage: "/images/blog/blog-04.png",
      author: "Sales Team",
      tags: ["distribution", "global", "expansion"],
      published: true,
      publishedAt: new Date("2024-07-05"),
    },
  ];

  await prisma.blogPost.createMany({ data: blogPosts });

  // ── Testimonials ──────────────────────────────────────────────────────────
  const testimonials = [
    {
      name: "Dr. Michael Hartmann",
      designation: "Chief Surgeon",
      company: "Universitätsklinikum Berlin",
      image: "/images/user/user-01.png",
      content:
        "Bäramed instruments have become an essential part of our surgical suite. The precision and durability of their scissors and forceps are unmatched in the industry.",
      rating: 5,
      featured: true,
      sortOrder: 1,
    },
    {
      name: "Prof. Sarah Williams",
      designation: "Head of Orthopedics",
      company: "Royal Medical Centre",
      image: "/images/user/user-02.png",
      content:
        "We have been using Bäramed orthopedic instruments for over five years. The quality consistency and excellent after-sales support make them our go-to supplier.",
      rating: 5,
      featured: true,
      sortOrder: 2,
    },
    {
      name: "Dr. Ahmed Al-Rashid",
      designation: "Neurosurgeon",
      company: "Gulf Medical Hospital",
      image: "/images/user/user-01.png",
      content:
        "The neurosurgery instruments from Bäramed are exceptionally well-crafted. Their attention to ergonomics and precision makes demanding procedures more manageable.",
      rating: 5,
      featured: false,
      sortOrder: 3,
    },
    {
      name: "Dr. Elena Kovacs",
      designation: "ENT Specialist",
      company: "Central European Clinic",
      image: "/images/user/user-02.png",
      content:
        "Reliable, precise, and competitively priced. Bäramed has been a trusted partner for our ENT department for years. We highly recommend their instrument sets.",
      rating: 5,
      featured: false,
      sortOrder: 4,
    },
  ];

  await prisma.testimonial.createMany({ data: testimonials });

  // ── FAQs ──────────────────────────────────────────────────────────────────
  const faqs = [
    {
      question: "HOW CAN I BUY BÄRAMED INSTRUMENTS PRODUCTS?",
      answer:
        "You can purchase Bäramed instruments through our authorized distributors worldwide or by contacting us directly through our contact form. We work with medical device distributors in multiple countries to ensure easy access to our products.",
      sortOrder: 1,
      published: true,
    },
    {
      question: "WHAT DOES BÄRAMED INSTRUMENTS WARRANTY MEAN?",
      answer:
        "Bäramed instruments come with a comprehensive warranty covering manufacturing defects. Our warranty ensures that all instruments meet the highest quality standards and are manufactured according to ISO 13485 and MDR regulations. Please contact us for specific warranty terms.",
      sortOrder: 2,
      published: true,
    },
    {
      question: "ARE BÄRAMED SURGICAL INSTRUMENTS TRACEABLE?",
      answer:
        "Yes, all Bäramed surgical instruments are fully traceable. Each instrument is marked with a unique product code and batch number, allowing complete traceability from raw materials to final product delivery.",
      sortOrder: 3,
      published: true,
    },
    {
      question:
        "WHICH TYPES OF STAINLESS STEELS ARE USED IN THE MANUFACTURE OF BÄRAMED SURGICAL INSTRUMENTS?",
      answer:
        "Bäramed uses premium German stainless steel grades including 420 and 440C, which meet ASTM F899 standards. These materials are specifically chosen for their corrosion resistance, durability, and biocompatibility required for medical device applications.",
      sortOrder: 4,
      published: true,
    },
    {
      question:
        "ARE BÄRAMED INSTRUMENTS COMPATIBLE WITH AUTOCLAVE STERILIZATION?",
      answer:
        "Yes, all Bäramed instruments are designed and finished to withstand repeated autoclave sterilization cycles without degradation. Our instruments maintain their performance and appearance through multiple sterilization cycles.",
      sortOrder: 5,
      published: true,
    },
  ];

  await prisma.faq.createMany({ data: faqs });

  // ── Downloads ─────────────────────────────────────────────────────────────
  const downloads = [
    {
      title: "Complete Product Catalog 2024",
      description: "Comprehensive catalog featuring all our surgical instruments",
      category: "CATALOG" as const,
      fileSize: "15.2 MB",
      fileType: "PDF",
      downloadUrl: "/downloads/catalog-2024.pdf",
      published: true,
      sortOrder: 1,
    },
    {
      title: "ISO 13485 Certificate",
      description: "Medical Devices Quality Management System Certificate",
      category: "CERTIFICATE" as const,
      fileSize: "2.1 MB",
      fileType: "PDF",
      downloadUrl: "/downloads/iso-13485.pdf",
      published: true,
      sortOrder: 1,
    },
    {
      title: "ISO 9001 Certificate",
      description: "Quality Management System Certificate",
      category: "CERTIFICATE" as const,
      fileSize: "1.8 MB",
      fileType: "PDF",
      downloadUrl: "/downloads/iso-9001.pdf",
      published: true,
      sortOrder: 2,
    },
    {
      title: "CE Declaration of Conformity",
      description: "European Conformity Declaration for Medical Devices",
      category: "CERTIFICATE" as const,
      fileSize: "1.5 MB",
      fileType: "PDF",
      downloadUrl: "/downloads/ce-declaration.pdf",
      published: true,
      sortOrder: 3,
    },
    {
      title: "Company Brochure",
      description: "Overview of our company, capabilities, and services",
      category: "BROCHURE" as const,
      fileSize: "8.5 MB",
      fileType: "PDF",
      downloadUrl: "/downloads/company-brochure.pdf",
      published: true,
      sortOrder: 1,
    },
    {
      title: "Scissors - Instructions for Use",
      description: "IFU for all types of surgical scissors",
      category: "IFU" as const,
      fileSize: "3.2 MB",
      fileType: "PDF",
      downloadUrl: "/downloads/ifu-scissors.pdf",
      published: true,
      sortOrder: 1,
    },
    {
      title: "Forceps - Instructions for Use",
      description: "IFU for all types of surgical forceps",
      category: "IFU" as const,
      fileSize: "2.9 MB",
      fileType: "PDF",
      downloadUrl: "/downloads/ifu-forceps.pdf",
      published: true,
      sortOrder: 2,
    },
    {
      title: "Retractors - Instructions for Use",
      description: "IFU for all types of surgical retractors",
      category: "IFU" as const,
      fileSize: "3.5 MB",
      fileType: "PDF",
      downloadUrl: "/downloads/ifu-retractors.pdf",
      published: true,
      sortOrder: 3,
    },
  ];

  await prisma.download.createMany({ data: downloads });

  // ── Videos ────────────────────────────────────────────────────────────────
  const videos = [
    {
      title: "Manufacturing Process Overview",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "/images/videos/manufacturing-thumb.jpg",
      description: "An overview of our precision manufacturing process for surgical instruments.",
      featured: true,
      sortOrder: 1,
    },
    {
      title: "Quality Control Procedures",
      youtubeId: "dQw4w9WgXcQ2",
      thumbnail: "/images/videos/quality-thumb.jpg",
      description: "See how every instrument is tested before leaving our facility.",
      featured: false,
      sortOrder: 2,
    },
    {
      title: "Product Showcase",
      youtubeId: "dQw4w9WgXcQ3",
      thumbnail: "/images/videos/products-thumb.jpg",
      description: "A showcase of our full range of surgical instruments.",
      featured: false,
      sortOrder: 3,
    },
  ];

  await prisma.video.createMany({ data: videos });

  return NextResponse.json({
    ok: true,
    categories: await prisma.category.count(),
    products: await prisma.product.count(),
    blogPosts: await prisma.blogPost.count(),
    testimonials: await prisma.testimonial.count(),
    faqs: await prisma.faq.count(),
    downloads: await prisma.download.count(),
    videos: await prisma.video.count(),
  });
}
