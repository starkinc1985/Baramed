import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/auth/admin-session";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: { template: "%s | Admin", default: "Admin" },
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin/apis", label: "APIs" },
  { href: "/admin/users/new", label: "Create user" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:px-6">
        <aside className="w-full shrink-0 md:w-56">
          <div className="rounded-xl border border-stroke bg-white p-4 dark:border-strokedark dark:bg-blacksection">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-waterloo">
              Admin
            </p>
            <p className="mb-4 truncate text-sm text-black dark:text-white">
              {session.email}
            </p>
            <nav className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-black transition hover:bg-primary/10 hover:text-primary dark:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-stroke pt-4 dark:border-strokedark">
              <LogoutButton />
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
