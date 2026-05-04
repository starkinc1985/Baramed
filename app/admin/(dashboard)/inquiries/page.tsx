import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Inquiries | Admin" };

const statusBadge = (status: string) => {
  if (status === "NEW") return "bg-primary/10 text-primary";
  if (status === "IN_PROGRESS") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
  return "bg-gray-100 text-waterloo dark:bg-strokedark";
};

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Inquiries</h1>
          <p className="text-sm text-waterloo">{inquiries.length} total</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Contact</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Type</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Status</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Items</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white lg:table-cell">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3">
                  <p className="font-medium text-black dark:text-white">{inq.name}</p>
                  <p className="text-xs text-waterloo">{inq.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-waterloo dark:bg-strokedark">{inq.type}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(inq.status)}`}>
                    {inq.status.replace("_", " ")}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-sm text-waterloo md:table-cell">{inq._count.items}</td>
                <td className="hidden px-4 py-3 text-xs text-waterloo lg:table-cell">{new Date(inq.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/inquiries/${inq.id}`} className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-waterloo">No inquiries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
