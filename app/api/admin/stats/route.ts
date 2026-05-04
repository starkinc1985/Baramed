import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  const [products, categories, blogPosts, testimonials, faqs, downloads, videos, inquiries, users, newInquiries] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.blogPost.count(),
      prisma.testimonial.count(),
      prisma.faq.count(),
      prisma.download.count(),
      prisma.video.count(),
      prisma.inquiry.count(),
      prisma.user.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
    ]);

  return NextResponse.json({ products, categories, blogPosts, testimonials, faqs, downloads, videos, inquiries, users, newInquiries });
}
