import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Dashboard | Admin" };

const statCards = [
  { label: "Products", href: "/admin/products", color: "text-primary" },
  { label: "Categories", href: "/admin/categories", color: "text-primary" },
  { label: "Blog Posts", href: "/admin/blog", color: "text-primary" },
  { label: "Testimonials", href: "/admin/testimonials", color: "text-primary" },
  { label: "FAQs", href: "/admin/faqs", color: "text-primary" },
  { label: "Downloads", href: "/admin/downloads", color: "text-primary" },
  { label: "Videos", href: "/admin/videos", color: "text-primary" },
  { label: "Users", href: "/admin/users", color: "text-primary" },
];

export default async function AdminDashboardPage() {
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

  const counts = [products, categories, blogPosts, testimonials, faqs, downloads, videos, users];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-black dark:text-white">Dashboard</h1>
      <p className="mb-6 text-sm text-waterloo">Welcome to the Baramed admin portal.</p>

      {newInquiries > 0 && (
        <Link
          href="/admin/inquiries"
          className="mb-6 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/10"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {newInquiries}
          </span>
          New {newInquiries === 1 ? "inquiry" : "inquiries"} awaiting review
        </Link>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-stroke bg-white p-4 transition hover:border-primary dark:border-strokedark dark:bg-blacksection"
          >
            <p className={`text-3xl font-bold ${card.color}`}>{counts[i]}</p>
            <p className="mt-1 text-sm text-waterloo group-hover:text-primary">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-stroke bg-white p-4 dark:border-strokedark dark:bg-blacksection">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-black dark:text-white">Inquiries</h2>
          <Link href="/admin/inquiries" className="text-xs font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="flex gap-3 text-sm">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">{newInquiries} New</span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-waterloo dark:bg-strokedark">{inquiries} Total</span>
        </div>
      </div>
    </div>
  );
}
