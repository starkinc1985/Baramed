"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";
const CATEGORIES = ["CATALOG", "CERTIFICATE", "BROCHURE", "IFU", "OTHER"];

export default function NewDownloadPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", category: "OTHER", fileSize: "", fileType: "PDF", downloadUrl: "", published: true, sortOrder: "0" });
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setStatus("saving");
    try {
      const res = await fetch("/api/admin/downloads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/downloads");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/downloads" className="text-sm text-waterloo hover:text-primary">← Downloads</Link>
        <h1 className="text-2xl font-bold text-black dark:text-white">New Download</h1>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
        <div><label className={LABEL}>Title *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={INPUT} /></div>
        <div><label className={LABEL}>Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={INPUT + " resize-none"} /></div>
        <div>
          <label className={LABEL}>Category *</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={INPUT}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div><label className={LABEL}>Download URL *</label><input required value={form.downloadUrl} onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })} className={INPUT} placeholder="https://..." /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={LABEL}>File Type</label><input value={form.fileType} onChange={(e) => setForm({ ...form, fileType: e.target.value })} className={INPUT} placeholder="PDF" /></div>
          <div><label className={LABEL}>File Size</label><input value={form.fileSize} onChange={(e) => setForm({ ...form, fileSize: e.target.value })} className={INPUT} placeholder="2.4 MB" /></div>
        </div>
        <div><label className={LABEL}>Sort Order</label><input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={INPUT} /></div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-primary" />
          Published
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Create Download"}
          </button>
          <Link href="/admin/downloads" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
