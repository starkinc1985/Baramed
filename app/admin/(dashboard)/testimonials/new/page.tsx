"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

export default function NewTestimonialPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: "", designation: "", company: "", image: "", content: "", rating: "5", featured: false, sortOrder: "0" });
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const fd = new FormData(); fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm((f) => ({ ...f, image: data.url }));
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setStatus("saving");
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Number(form.rating), sortOrder: Number(form.sortOrder) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/testimonials");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/testimonials" className="text-sm text-waterloo hover:text-primary">← Testimonials</Link>
        <h1 className="text-2xl font-bold text-black dark:text-white">New Testimonial</h1>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
        <div><label className={LABEL}>Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={INPUT} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={LABEL}>Designation</label><input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className={INPUT} /></div>
          <div><label className={LABEL}>Company</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={INPUT} /></div>
        </div>
        <div>
          <label className={LABEL}>Photo</label>
          {form.image && <img src={form.image} alt="" className="mb-2 h-16 w-16 rounded-full object-cover" />}
          <div className="flex gap-2">
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={INPUT} placeholder="https://..." />
            <label className={`flex cursor-pointer items-center rounded-lg border border-stroke px-3 py-2 text-xs font-medium text-waterloo hover:border-primary hover:text-primary dark:border-strokedark ${uploading ? "opacity-50" : ""}`}>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              {uploading ? "…" : "Upload"}
            </label>
          </div>
        </div>
        <div><label className={LABEL}>Content *</label><textarea required rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={INPUT + " resize-none"} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={LABEL}>Rating (1–5)</label>
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className={INPUT}>
              {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>)}
            </select>
          </div>
          <div><label className={LABEL}>Sort Order</label><input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={INPUT} /></div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary" />
          Featured
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Create Testimonial"}
          </button>
          <Link href="/admin/testimonials" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
