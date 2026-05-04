"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

type Category = { id: string; name: string; type: string; parentId: string | null };

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ type: "INSTRUMENT", name: "", slug: "", description: "", parentId: "" });
  const [parents, setParents] = useState<Category[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "deleting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/categories/${id}`).then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
    ]).then(([cd, all]) => {
      const c = cd.category;
      setForm({ type: c.type, name: c.name, slug: c.slug, description: c.description ?? "", parentId: c.parentId ?? "" });
      setParents((all.categories ?? []).filter((x: Category) => !x.parentId && x.id !== id));
      setLoading(false);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("saving");
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, parentId: form.parentId || null }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/categories");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  async function handleDelete() {
    if (!confirm("Delete this category? Products linked to it may be affected.")) return;
    setStatus("deleting");
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    router.push("/admin/categories");
  }

  if (loading) return <div className="py-12 text-center text-sm text-waterloo">Loading…</div>;
  const filteredParents = parents.filter((p) => p.type === form.type);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/categories" className="text-sm text-waterloo hover:text-primary">← Categories</Link>
          <h1 className="text-2xl font-bold text-black dark:text-white">Edit Category</h1>
        </div>
        <button type="button" onClick={handleDelete} disabled={status === "deleting"} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60">
          {status === "deleting" ? "Deleting…" : "Delete"}
        </button>
      </div>

      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
        <div>
          <label className={LABEL}>Type</label>
          <input disabled value={form.type} className={INPUT + " opacity-60 cursor-not-allowed"} />
          <p className="mt-1 text-xs text-waterloo">Type cannot be changed after creation.</p>
        </div>
        <div>
          <label className={LABEL}>Parent Category</label>
          <select value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })} className={INPUT}>
            <option value="">— Top-level category —</option>
            {filteredParents.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>Slug *</label>
          <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={INPUT + " resize-none"} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Save Changes"}
          </button>
          <Link href="/admin/categories" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
