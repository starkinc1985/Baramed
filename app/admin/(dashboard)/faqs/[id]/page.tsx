"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

export default function EditFaqPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ question: "", answer: "", category: "", sortOrder: "0", published: true });
  const [status, setStatus] = useState<"idle" | "saving" | "deleting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/faqs/${id}`).then((r) => r.json()).then((d) => {
      const f = d.faq;
      setForm({ question: f.question, answer: f.answer, category: f.category ?? "", sortOrder: String(f.sortOrder), published: f.published });
      setLoading(false);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setStatus("saving");
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/faqs");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  async function handleDelete() {
    if (!confirm("Delete this FAQ?")) return;
    setStatus("deleting");
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    router.push("/admin/faqs");
  }

  if (loading) return <div className="py-12 text-center text-sm text-waterloo">Loading…</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/faqs" className="text-sm text-waterloo hover:text-primary">← FAQs</Link>
          <h1 className="text-2xl font-bold text-black dark:text-white">Edit FAQ</h1>
        </div>
        <button type="button" onClick={handleDelete} disabled={status === "deleting"} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60">
          {status === "deleting" ? "Deleting…" : "Delete"}
        </button>
      </div>
      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
        <div><label className={LABEL}>Question *</label><input required value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className={INPUT} /></div>
        <div><label className={LABEL}>Answer *</label><textarea required rows={5} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className={INPUT + " resize-none"} /></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div><label className={LABEL}>Category</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={INPUT} /></div>
          <div><label className={LABEL}>Sort Order</label><input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className={INPUT} /></div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-primary" />
          Published
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Save Changes"}
          </button>
          <Link href="/admin/faqs" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
