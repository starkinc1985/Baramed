import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Downloads | Admin" };

export default async function AdminDownloadsPage() {
  const downloads = await prisma.download.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Downloads</h1>
          <p className="text-sm text-waterloo">{downloads.length} total</p>
        </div>
        <Link href="/admin/downloads/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho">
          + New Download
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Title</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Category</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Type / Size</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((d) => (
              <tr key={d.id} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3 font-medium text-black dark:text-white">{d.title}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{d.category}</span>
                </td>
                <td className="hidden px-4 py-3 text-xs text-waterloo md:table-cell">
                  {[d.fileType, d.fileSize].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="px-4 py-3">
                  {d.published ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">Published</span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-waterloo dark:bg-strokedark">Hidden</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/downloads/${d.id}`} className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {downloads.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-waterloo">No downloads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
