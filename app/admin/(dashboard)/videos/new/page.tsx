"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

export default function NewVideoPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", youtubeId: "", thumbnail: "", description: "", featured: false, sortOrder: "0" });
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function extractYoutubeId(input: string) {
    const match = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : input;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setStatus("saving");
    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, youtubeId: extractYoutubeId(form.youtubeId), sortOrder: Number(form.sortOrder) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/videos");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  const previewId = extractYoutubeId(form.youtubeId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/videos" className="text-sm text-waterloo hover:text-primary">← Videos</Link>
        <h1 className="text-2xl font-bold text-black dark:text-white">New Video</h1>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
        <div><label className={LABEL}>Title *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={INPUT} /></div>
        <div>
          <label className={LABEL}>YouTube ID or URL *</label>
          <input required value={form.youtubeId} onChange={(e) => setForm({ ...form, youtubeId: e.target.value })} className={INPUT} placeholder="dQw4w9WgXcQ or https://youtube.com/watch?v=..." />
          <p className="mt-1 text-xs text-waterloo">Paste a YouTube URL and the ID will be extracted automatically.</p>
        </div>
        {previewId && previewId.length > 5 && (
          <div className="overflow-hidden rounded-lg">
            <img src={`https://img.youtube.com/vi/${previewId}/mqdefault.jpg`} alt="thumbnail" className="w-full rounded-lg" />
          </div>
        )}
        <div><label className={LABEL}>Custom Thumbnail URL</label><input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} className={INPUT} placeholder="Leave blank to use YouTube thumbnail" /></div>
        <div><label className={LABEL}>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={INPUT + " resize-none"} /></div>
        <div><label className={LABEL}>Sort Order</label><input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={INPUT} /></div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary" />
          Featured
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Create Video"}
          </button>
          <Link href="/admin/videos" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
