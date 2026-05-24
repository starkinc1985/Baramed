"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

export default function EditVideoPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", youtubeId: "", thumbnail: "", description: "", featured: false, sortOrder: "0" });
  const [status, setStatus] = useState<"idle" | "saving" | "deleting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/videos/${id}`).then((r) => r.json()).then((d) => {
      const v = d.video;
      setForm({ title: v.title, youtubeId: v.youtubeId, thumbnail: v.thumbnail ?? "", description: v.description ?? "", featured: v.featured, sortOrder: String(v.sortOrder) });
      setLoading(false);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setStatus("saving");
    try {
      const res = await fetch(`/api/admin/videos/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/videos");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  async function handleDelete() {
    if (!confirm("Delete this video?")) return;
    setStatus("deleting");
    await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
    router.push("/admin/videos");
  }

  if (loading) return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
          <div className="h-7 w-28 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
        </div>
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
      </div>
      <div className="space-y-6">
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
          <div className="mb-4 h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
          <div className="space-y-3">
            <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
            <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
              <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
            </div>
            <div className="h-24 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
          <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/videos" className="text-sm text-waterloo hover:text-primary">← Videos</Link>
          <h1 className="text-2xl font-bold text-black dark:text-white">Edit Video</h1>
        </div>
        <button type="button" onClick={handleDelete} disabled={status === "deleting"} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60">
          {status === "deleting" ? "Deleting…" : "Delete"}
        </button>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
        <div><label className={LABEL}>Title *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={INPUT} /></div>
        <div>
          <label className={LABEL}>YouTube ID *</label>
          <input required value={form.youtubeId} onChange={(e) => setForm({ ...form, youtubeId: e.target.value })} className={INPUT} />
        </div>
        {form.youtubeId && (
          <img src={`https://img.youtube.com/vi/${form.youtubeId}/mqdefault.jpg`} alt="thumbnail" className="w-full rounded-lg" />
        )}
        <div><label className={LABEL}>Custom Thumbnail URL</label><input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} className={INPUT} /></div>
        <div><label className={LABEL}>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={INPUT + " resize-none"} /></div>
        <div><label className={LABEL}>Sort Order</label><input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={INPUT} /></div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary" />
          Featured
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Save Changes"}
          </button>
          <Link href="/admin/videos" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
