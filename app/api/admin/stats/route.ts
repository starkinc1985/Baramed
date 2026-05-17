import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { BlogPost } from "@/models/BlogPost";
import { Testimonial } from "@/models/Testimonial";
import { Faq } from "@/models/Faq";
import { Download } from "@/models/Download";
import { Video } from "@/models/Video";
import { Inquiry } from "@/models/Inquiry";
import { User } from "@/models/User";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();

  await connectDB();

  const [products, categories, blogPosts, testimonials, faqs, downloads, videos, inquiries, users, newInquiries] =
    await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      BlogPost.countDocuments(),
      Testimonial.countDocuments(),
      Faq.countDocuments(),
      Download.countDocuments(),
      Video.countDocuments(),
      Inquiry.countDocuments(),
      User.countDocuments(),
      Inquiry.countDocuments({ status: "NEW" }),
    ]);

  return NextResponse.json({ products, categories, blogPosts, testimonials, faqs, downloads, videos, inquiries, users, newInquiries });
}
