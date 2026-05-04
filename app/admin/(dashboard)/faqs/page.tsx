import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "FAQs | Admin" };

export default async function AdminFaqsPage() {
  const faqs = await prisma.faq.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">FAQs</h1>
          <p className="text-sm text-waterloo">{faqs.length} total</p>
        </div>
        <Link href="/admin/faqs/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho">
          + New FAQ
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Question</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Category</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Status</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3 font-medium text-black dark:text-white line-clamp-1 max-w-xs">{f.question}</td>
                <td className="hidden px-4 py-3 text-sm text-waterloo md:table-cell">{f.category ?? "—"}</td>
                <td className="px-4 py-3">
                  {f.published ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">Published</span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-waterloo dark:bg-strokedark">Hidden</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-waterloo">{f.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/faqs/${f.id}`} className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {faqs.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-waterloo">No FAQs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
