"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

export default function NewBlogPostPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", coverImage: "", author: "", tags: "", published: false });
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function autoSlug(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((f) => ({ ...f, coverImage: data.url }));
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setStatus("saving");
    try {
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
      const res = await fetch("/api/admin/blog", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/blog");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/blog" className="text-sm text-waterloo hover:text-primary">← Blog Posts</Link>
        <h1 className="text-2xl font-bold text-black dark:text-white">New Blog Post</h1>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection space-y-4">
          <h2 className="text-base font-semibold text-black dark:text-white">Post Details</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={LABEL}>Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Slug *</label>
              <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={INPUT} />
            </div>
          </div>
          <div><label className={LABEL}>Author</label><input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className={INPUT} /></div>
          <div><label className={LABEL}>Excerpt</label><textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={INPUT + " resize-none"} /></div>
          <div><label className={LABEL}>Content *</label><textarea required rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={INPUT + " resize-none"} /></div>
          <div><label className={LABEL}>Tags (comma-separated)</label><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className={INPUT} placeholder="quality, instruments, surgical" /></div>
          <div>
            <label className={LABEL}>Cover Image</label>
            {form.coverImage && <img src={form.coverImage} alt="cover" className="mb-2 h-32 w-full rounded-lg object-cover" />}
            <div className="flex gap-2">
              <input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className={INPUT} placeholder="https://... or upload below" />
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
            {status === "saving" ? "Saving…" : "Create Post"}
          </button>
          <Link href="/admin/blog" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
