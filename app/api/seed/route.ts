import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { BlogPost } from "@/models/BlogPost";
import { Testimonial } from "@/models/Testimonial";
import { Faq } from "@/models/Faq";
import { Download } from "@/models/Download";
import { Video } from "@/models/Video";
import { Inquiry } from "@/models/Inquiry";
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

  await connectDB();

  // Clear all collections
  await Promise.all([
    Inquiry.deleteMany({}),
    Product.deleteMany({}),
    Category.deleteMany({}),
    BlogPost.deleteMany({}),
    Testimonial.deleteMany({}),
    Faq.deleteMany({}),
    Download.deleteMany({}),
    Video.deleteMany({}),
  ]);

  // ── Categories ────────────────────────────────────────────────────────────
  async function createCategoryTree(
    type: "INSTRUMENT" | "SURGERY",
    cats: AnyCategory[],
  ) {
    for (const c of cats) {
      const parent = await Category.create({
        type,
        name: c.name,
        slug: c.slug,
        description: c.description ?? undefined,
      });

      if (Array.isArray(c.subcategories)) {
        for (const s of c.subcategories) {
          await Category.create({
            type,
            name: s.name,
            slug: s.slug,
            description: s.description ?? undefined,
            parentId: parent._id,
          });
        }
      }
    }
  }

  await createCategoryTree("INSTRUMENT", instrumentTypeCategories as unknown as AnyCategory[]);
  await createCategoryTree("SURGERY", surgeryTypeCategories as unknown as AnyCategory[]);

  const categories = await Category.find({}).lean();
  const categoryIdBySlug = new Map(categories.map((c: any) => [c.slug, c._id]));

  // ── Products ──────────────────────────────────────────────────────────────
  for (const p of sampleProducts as any[]) {
    const slugs = new Set<string>();
    if (typeof p.category === "string") slugs.add(p.category);
    if (typeof p.subcategory === "string") slugs.add(p.subcategory);
    if (Array.isArray(p.surgeryTypes)) {
      for (const st of p.surgeryTypes) if (typeof st === "string") slugs.add(st);
    }

    const categoryIds = [...slugs]
      .map((slug) => categoryIdBySlug.get(slug))
      .filter(Boolean);

    await Product.create({
      name: p.name,
      productCode: p.productCode,
      shortDescription: p.shortDescription ?? undefined,
      description: p.description,
      featured: !!p.featured,
      inStock: p.inStock !== false,
      images: (p.images ?? []).map((url: string, idx: number) => ({ url, sortOrder: idx })),
      specs: Object.entries(p.specifications ?? {}).map(([key, value]) => ({
        key,
        value: String(value),
      })),
      categoryIds,
    });
  }

  // ── Blog Posts ────────────────────────────────────────────────────────────
  await BlogPost.insertMany([
    {
      title: "Announcing the Launch of Our New Website 2024",
      slug: "announcing-new-website-2024",
      excerpt: "We are very excited to announce the launch of our newly designed website.",
      content: "We are very excited to announce the launch of our newly designed website. After months of hard work, we're proud to present an improved platform for browsing our comprehensive range of surgical instruments.",
      coverImage: "/images/blog/blog-01.png",
      author: "BÄRAMED Team",
      tags: ["news", "website"],
      published: true,
      publishedAt: new Date("2024-01-15"),
    },
    {
      title: "Company Statement on Quality Standards",
      slug: "company-quality-standards",
      excerpt: "At Bäramed Instruments, our founding principle has always been driven to help improve patient health outcomes.",
      content: "At Bäramed Instruments, our founding principle has always been driven to help improve patient health outcomes through precision manufacturing and rigorous quality control processes.",
      coverImage: "/images/blog/blog-02.png",
      author: "Quality Team",
      tags: ["quality", "standards"],
      published: true,
      publishedAt: new Date("2024-03-10"),
    },
    {
      title: "New ISO 13485:2016 Certification Achieved",
      slug: "iso-13485-certification",
      excerpt: "We are pleased to announce that Bäramed Instruments has successfully achieved ISO 13485:2016 certification.",
      content: "We are pleased to announce that Bäramed Instruments has successfully achieved ISO 13485:2016 certification, demonstrating our commitment to medical device quality management.",
      coverImage: "/images/blog/blog-03.png",
      author: "Compliance Team",
      tags: ["certification", "ISO", "quality"],
      published: true,
      publishedAt: new Date("2024-05-20"),
    },
    {
      title: "Expanding Our Global Distribution Network",
      slug: "expanding-global-distribution",
      excerpt: "Bäramed Instruments is expanding its global reach with new distribution partnerships.",
      content: "Bäramed Instruments is expanding its global reach with new distribution partnerships in key markets, ensuring timely delivery of high-quality surgical instruments worldwide.",
      coverImage: "/images/blog/blog-04.png",
      author: "Sales Team",
      tags: ["distribution", "global", "expansion"],
      published: true,
      publishedAt: new Date("2024-07-05"),
    },
  ]);

  // ── Testimonials ──────────────────────────────────────────────────────────
  await Testimonial.insertMany([
    { name: "Dr. Michael Hartmann", designation: "Chief Surgeon", company: "Universitätsklinikum Berlin", image: "/images/user/user-01.png", content: "Bäramed instruments have become an essential part of our surgical suite.", rating: 5, featured: true, sortOrder: 1 },
    { name: "Prof. Sarah Williams", designation: "Head of Orthopedics", company: "Royal Medical Centre", image: "/images/user/user-02.png", content: "We have been using Bäramed orthopedic instruments for over five years.", rating: 5, featured: true, sortOrder: 2 },
    { name: "Dr. Ahmed Al-Rashid", designation: "Neurosurgeon", company: "Gulf Medical Hospital", image: "/images/user/user-01.png", content: "The neurosurgery instruments from Bäramed are exceptionally well-crafted.", rating: 5, featured: false, sortOrder: 3 },
    { name: "Dr. Elena Kovacs", designation: "ENT Specialist", company: "Central European Clinic", image: "/images/user/user-02.png", content: "Reliable, precise, and competitively priced.", rating: 5, featured: false, sortOrder: 4 },
  ]);

  // ── FAQs ──────────────────────────────────────────────────────────────────
  await Faq.insertMany([
    { question: "HOW CAN I BUY BÄRAMED INSTRUMENTS PRODUCTS?", answer: "You can purchase Bäramed instruments through our authorized distributors worldwide or by contacting us directly.", sortOrder: 1, published: true },
    { question: "WHAT DOES BÄRAMED INSTRUMENTS WARRANTY MEAN?", answer: "Bäramed instruments come with a comprehensive warranty covering manufacturing defects.", sortOrder: 2, published: true },
    { question: "ARE BÄRAMED SURGICAL INSTRUMENTS TRACEABLE?", answer: "Yes, all Bäramed surgical instruments are fully traceable with unique product codes and batch numbers.", sortOrder: 3, published: true },
    { question: "WHICH TYPES OF STAINLESS STEELS ARE USED?", answer: "Bäramed uses premium German stainless steel grades including 420 and 440C, meeting ASTM F899 standards.", sortOrder: 4, published: true },
    { question: "ARE BÄRAMED INSTRUMENTS COMPATIBLE WITH AUTOCLAVE STERILIZATION?", answer: "Yes, all instruments are designed to withstand repeated autoclave sterilization cycles.", sortOrder: 5, published: true },
  ]);

  // ── Downloads ─────────────────────────────────────────────────────────────
  await Download.insertMany([
    { title: "Complete Product Catalog 2024", description: "Comprehensive catalog featuring all our surgical instruments", category: "CATALOG", fileSize: "15.2 MB", fileType: "PDF", downloadUrl: "/downloads/catalog-2024.pdf", published: true, sortOrder: 1 },
    { title: "ISO 13485 Certificate", description: "Medical Devices Quality Management System Certificate", category: "CERTIFICATE", fileSize: "2.1 MB", fileType: "PDF", downloadUrl: "/downloads/iso-13485.pdf", published: true, sortOrder: 1 },
    { title: "ISO 9001 Certificate", description: "Quality Management System Certificate", category: "CERTIFICATE", fileSize: "1.8 MB", fileType: "PDF", downloadUrl: "/downloads/iso-9001.pdf", published: true, sortOrder: 2 },
    { title: "CE Declaration of Conformity", description: "European Conformity Declaration for Medical Devices", category: "CERTIFICATE", fileSize: "1.5 MB", fileType: "PDF", downloadUrl: "/downloads/ce-declaration.pdf", published: true, sortOrder: 3 },
    { title: "Company Brochure", description: "Overview of our company, capabilities, and services", category: "BROCHURE", fileSize: "8.5 MB", fileType: "PDF", downloadUrl: "/downloads/company-brochure.pdf", published: true, sortOrder: 1 },
    { title: "Scissors - Instructions for Use", description: "IFU for all types of surgical scissors", category: "IFU", fileSize: "3.2 MB", fileType: "PDF", downloadUrl: "/downloads/ifu-scissors.pdf", published: true, sortOrder: 1 },
    { title: "Forceps - Instructions for Use", description: "IFU for all types of surgical forceps", category: "IFU", fileSize: "2.9 MB", fileType: "PDF", downloadUrl: "/downloads/ifu-forceps.pdf", published: true, sortOrder: 2 },
    { title: "Retractors - Instructions for Use", description: "IFU for all types of surgical retractors", category: "IFU", fileSize: "3.5 MB", fileType: "PDF", downloadUrl: "/downloads/ifu-retractors.pdf", published: true, sortOrder: 3 },
  ]);

  // ── Videos ────────────────────────────────────────────────────────────────
  await Video.insertMany([
    { title: "Manufacturing Process Overview", youtubeId: "dQw4w9WgXcQ", description: "An overview of our precision manufacturing process.", featured: true, sortOrder: 1 },
    { title: "Quality Control Procedures", youtubeId: "dQw4w9WgXcQ2", description: "See how every instrument is tested before leaving our facility.", featured: false, sortOrder: 2 },
    { title: "Product Showcase", youtubeId: "dQw4w9WgXcQ3", description: "A showcase of our full range of surgical instruments.", featured: false, sortOrder: 3 },
  ]);

  return NextResponse.json({
    ok: true,
    categories: await Category.countDocuments(),
    products: await Product.countDocuments(),
    blogPosts: await BlogPost.countDocuments(),
    testimonials: await Testimonial.countDocuments(),
    faqs: await Faq.countDocuments(),
    downloads: await Download.countDocuments(),
    videos: await Video.countDocuments(),
  });
}
