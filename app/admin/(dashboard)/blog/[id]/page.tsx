"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

export default function EditBlogPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", coverImage: "", author: "", tags: "", published: false });
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "deleting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`).then((r) => r.json()).then((d) => {
      const p = d.post;
      setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt ?? "", content: p.content, coverImage: p.coverImage ?? "", author: p.author ?? "", tags: p.tags.join(", "), published: p.published });
      setLoading(false);
    });
  }, [id]);

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((f) => ({ ...f, coverImage: data.url }));
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setStatus("saving");
    try {
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/blog");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;
    setStatus("deleting");
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    router.push("/admin/blog");
  }

  if (loading) return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
          <div className="h-7 w-32 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
        </div>
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
            <div className="mb-4 h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-strokedark" />
            <div className="space-y-3">
              <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
              <div className="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
              <div className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-strokedark" />
            </div>
          </div>
        ))}
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
          <Link href="/admin/blog" className="text-sm text-waterloo hover:text-primary">← Blog Posts</Link>
          <h1 className="text-2xl font-bold text-black dark:text-white">Edit Post</h1>
        </div>
        <button type="button" onClick={handleDelete} disabled={status === "deleting"} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60">
          {status === "deleting" ? "Deleting…" : "Delete"}
        </button>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection space-y-4">
          <h2 className="text-base font-semibold text-black dark:text-white">Post Details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div><label className={LABEL}>Title *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={INPUT} /></div>
            <div><label className={LABEL}>Slug *</label><input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={INPUT} /></div>
          </div>
          <div><label className={LABEL}>Author</label><input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={INPUT} /></div>
          <div><label className={LABEL}>Excerpt</label><textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={INPUT + " resize-none"} /></div>
          <div><label className={LABEL}>Content *</label><textarea required rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={INPUT + " resize-none"} /></div>
          <div><label className={LABEL}>Tags (comma-separated)</label><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={INPUT} /></div>
          <div>
            <label className={LABEL}>Cover Image</label>
            {form.coverImage && <img src={form.coverImage} alt="cover" className="mb-2 h-32 w-full rounded-lg object-cover" />}
            <div className="flex gap-2">
              <input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className={INPUT} placeholder="https://..." />
              <label className={`flex cursor-pointer items-center rounded-lg border border-stroke px-3 py-2 text-xs font-medium text-waterloo transition hover:border-primary hover:text-primary dark:border-strokedark ${uploading ? "opacity-50" : ""}`}>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} disabled={uploading} />
                {uploading ? "…" : "Upload"}
              </label>
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-primary" />
            Published
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Save Changes"}
          </button>
          <Link href="/admin/blog" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
