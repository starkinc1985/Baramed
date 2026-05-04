"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navGroups = [
  {
    label: "Content",
    items: [
      { href: "/admin", label: "Dashboard", exact: true },
      { href: "/admin/products", label: "Products" },
      { href: "/admin/categories", label: "Categories" },
      { href: "/admin/blog", label: "Blog Posts" },
      { href: "/admin/testimonials", label: "Testimonials" },
      { href: "/admin/faqs", label: "FAQs" },
      { href: "/admin/downloads", label: "Downloads" },
      { href: "/admin/videos", label: "Videos" },
    ],
  },
  {
    label: "Business",
    items: [{ href: "/admin/inquiries", label: "Inquiries" }],
  },
  {
    label: "System",
    items: [
      { href: "/admin/users", label: "Users" },
      { href: "/admin/users/new", label: "New User" },
      { href: "/admin/apis", label: "API Registry" },
    ],
  },
];

export default function AdminNav() {
  const path = usePathname();

  return (
    <nav className="flex flex-col gap-4">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-waterloo">
            {group.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive = item.exact
                ? path === item.href
                : path === item.href || path.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-black hover:bg-primary/10 hover:text-primary dark:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
