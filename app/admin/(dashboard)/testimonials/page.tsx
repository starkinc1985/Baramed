import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

export const metadata: Metadata = { title: "Testimonials | Admin" };

export default async function AdminTestimonialsPage() {
  await connectDB();

  const testimonials = await Testimonial.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Testimonials</h1>
          <p className="text-sm text-waterloo">{testimonials.length} total</p>
        </div>
        <Link href="/admin/testimonials/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho">
          + New Testimonial
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Name</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Company</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Rating</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(testimonials as any[]).map((t) => (
              <tr key={t._id.toString()} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3">
                  <p className="font-medium text-black dark:text-white">{t.name}</p>
                  {t.designation && <p className="text-xs text-waterloo">{t.designation}</p>}
                </td>
                <td className="hidden px-4 py-3 text-sm text-waterloo md:table-cell">{t.company ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-waterloo">{"★".repeat(t.rating)}</td>
                <td className="px-4 py-3">
                  {t.featured && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Featured</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/testimonials/${t._id.toString()}`} className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-waterloo">No testimonials yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
