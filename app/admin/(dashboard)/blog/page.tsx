import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

export const metadata: Metadata = { title: "Blog Posts | Admin" };

export default async function AdminBlogPage() {
  await connectDB();

  const posts = await BlogPost.find({}).sort({ createdAt: -1 })
    .select("title slug published author publishedAt createdAt")
    .lean();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Blog Posts</h1>
          <p className="text-sm text-waterloo">{posts.length} total</p>
        </div>
        <Link href="/admin/blog/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho">
          + New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Title</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white md:table-cell">Author</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Status</th>
              <th className="hidden px-4 py-3 font-semibold text-black dark:text-white lg:table-cell">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(posts as any[]).map((p) => (
              <tr key={p._id.toString()} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3">
                  <p className="font-medium text-black dark:text-white line-clamp-1">{p.title}</p>
                  <p className="font-mono text-xs text-waterloo">{p.slug}</p>
                </td>
                <td className="hidden px-4 py-3 text-sm text-waterloo md:table-cell">{p.author ?? "—"}</td>
                <td className="px-4 py-3">
                  {p.published ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">Published</span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-waterloo dark:bg-strokedark">Draft</span>
                  )}
                </td>
                <td className="hidden px-4 py-3 text-xs text-waterloo lg:table-cell">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blog/${p._id.toString()}`} className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-waterloo">No posts yet. <Link href="/admin/blog/new" className="text-primary hover:underline">Add one</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
