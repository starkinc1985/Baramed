import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/admin-session";
import LogoutButton from "./LogoutButton";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: { template: "%s | Admin", default: "Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:px-6">
        <aside className="w-full shrink-0 md:w-56">
          <div className="sticky top-8 rounded-xl border border-stroke bg-white p-4 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-waterloo">
                Baramed Admin
              </p>
              <p className="truncate text-sm font-medium text-black dark:text-white">
                {session.email}
              </p>
            </div>
            <AdminNav />
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
