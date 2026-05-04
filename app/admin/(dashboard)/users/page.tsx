import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Users | Admin" };

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Users</h1>
          <p className="text-sm text-waterloo">{users.length} administrator{users.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/admin/users/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho">
          + New User
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Email</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Name</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Role</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3 font-medium text-black dark:text-white">{u.email}</td>
                <td className="hidden px-4 py-3 text-sm text-waterloo md:table-cell">{u.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{u.role}</span>
                </td>
                <td className="px-4 py-3 text-xs text-waterloo">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
