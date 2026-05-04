"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

type Category = { id: string; name: string; type: string; parentId: string | null };

export default function NewCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState({ type: "INSTRUMENT", name: "", slug: "", description: "", parentId: "" });
  const [parents, setParents] = useState<Category[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/categories").then((r) => r.json()).then((d) =>
      setParents((d.categories ?? []).filter((c: Category) => !c.parentId))
    );
  }, []);

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, parentId: form.parentId || null }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/categories");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  const filteredParents = parents.filter((p) => p.type === form.type);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/categories" className="text-sm text-waterloo hover:text-primary">← Categories</Link>
        <h1 className="text-2xl font-bold text-black dark:text-white">New Category</h1>
      </div>

      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
        <div>
          <label className={LABEL}>Type *</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value, parentId: "" })} className={INPUT}>
            <option value="INSTRUMENT">Instrument Type</option>
            <option value="SURGERY">Surgery Type</option>
          </select>
        </div>
        <div>
          <label className={LABEL}>Parent Category (optional)</label>
          <select value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })} className={INPUT}>
            <option value="">— Top-level category —</option>
            {filteredParents.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: autoSlug(e.target.value) })} className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>Slug *</label>
          <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={INPUT} placeholder="auto-generated-from-name" />
        </div>
        <div>
          <label className={LABEL}>Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={INPUT + " resize-none"} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Create Category"}
          </button>
          <Link href="/admin/categories" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
