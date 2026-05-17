import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Video } from "@/models/Video";

export const metadata: Metadata = { title: "Videos | Admin" };

export default async function AdminVideosPage() {
  await connectDB();

  const videos = await Video.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Videos</h1>
          <p className="text-sm text-waterloo">{videos.length} total</p>
        </div>
        <Link href="/admin/videos/new" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryho">
          + New Video
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stroke bg-gray-50 dark:border-strokedark dark:bg-black">
            <tr>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Title</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">YouTube ID</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Featured</th>
              <th className="px-4 py-3 font-semibold text-black dark:text-white">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(videos as any[]).map((v) => (
              <tr key={v._id.toString()} className="border-b border-stroke last:border-0 dark:border-strokedark">
                <td className="px-4 py-3 font-medium text-black dark:text-white">{v.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-waterloo">{v.youtubeId}</td>
                <td className="px-4 py-3">
                  {v.featured && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Featured</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-waterloo">{v.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/videos/${v._id.toString()}`} className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {videos.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-waterloo">No videos yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
