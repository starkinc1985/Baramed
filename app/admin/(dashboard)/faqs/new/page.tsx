"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

export default function NewFaqPage() {
  const router = useRouter();
  const [form, setForm] = useState({ question: "", answer: "", category: "", sortOrder: "0", published: true });
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setStatus("saving");
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/faqs");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/faqs" className="text-sm text-waterloo hover:text-primary">← FAQs</Link>
        <h1 className="text-2xl font-bold text-black dark:text-white">New FAQ</h1>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
        <div><label className={LABEL}>Question *</label><input required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className={INPUT} /></div>
        <div><label className={LABEL}>Answer *</label><textarea required rows={5} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className={INPUT + " resize-none"} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={LABEL}>Category</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={INPUT} placeholder="e.g. Shipping" /></div>
          <div><label className={LABEL}>Sort Order</label><input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={INPUT} /></div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-primary" />
          Published
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Create FAQ"}
          </button>
          <Link href="/admin/faqs" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
