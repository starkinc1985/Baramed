"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const INPUT = "w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-sm text-black dark:border-strokedark dark:text-white focus:border-primary focus:outline-none";
const LABEL = "mb-1 block text-sm font-medium text-black dark:text-white";

type Category = { id: string; name: string; type: string; parentId: string | null; slug: string };

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ name: "", productCode: "", shortDescription: "", description: "", featured: false, inStock: true });
  const [images, setImages] = useState<string[]>([]);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([]);
  const [variations, setVariations] = useState<{ name: string; catalogNumber: string }[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/categories").then((r) => r.json()).then((d) => setAllCategories(d.categories ?? []));
  }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setImages((prev) => [...prev, data.url]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function toggleCategory(id: string) {
    setSelectedCategoryIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrls: images, specs, variations, categoryIds: selectedCategoryIds }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed"); setStatus("error"); return; }
      router.push("/admin/products");
    } catch { setError("Request failed"); setStatus("error"); }
  }

  const parents = allCategories.filter((c) => !c.parentId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/products" className="text-sm text-waterloo hover:text-primary">← Products</Link>
        <h1 className="text-2xl font-bold text-black dark:text-white">New Product</h1>
      </div>

      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
          <h2 className="mb-4 text-base font-semibold text-black dark:text-white">Basic Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div><label className={LABEL}>Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={INPUT} /></div>
            <div><label className={LABEL}>Product Code *</label><input required value={form.productCode} onChange={(e) => setForm({ ...form, productCode: e.target.value })} className={INPUT} /></div>
          </div>
          <div className="mt-4"><label className={LABEL}>Short Description</label><input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className={INPUT} /></div>
          <div className="mt-4"><label className={LABEL}>Description *</label><textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={INPUT + " resize-none"} /></div>
          <div className="mt-4 flex gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary" />
              Featured
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-black dark:text-white">
              <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="accent-primary" />
              In Stock
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
          <h2 className="mb-4 text-base font-semibold text-black dark:text-white">Product Images</h2>
          <div className="flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div key={i} className="group relative h-24 w-24 overflow-hidden rounded-lg border border-stroke dark:border-strokedark">
                <Image src={url} alt="" width={96} height={96} className="h-full w-full object-cover" />
                <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  ×
                </button>
                {i === 0 && <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 text-[10px] text-white">Main</span>}
              </div>
            ))}
            <label className={`flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-stroke text-waterloo transition hover:border-primary hover:text-primary dark:border-strokedark ${uploading ? "opacity-50" : ""}`}>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              <span className="text-2xl">+</span>
              <span className="text-[10px]">{uploading ? "Uploading…" : "Upload"}</span>
            </label>
          </div>
        </div>

        {/* Specs */}
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
          <h2 className="mb-4 text-base font-semibold text-black dark:text-white">Specifications</h2>
          <div className="space-y-2">
            {specs.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input placeholder="Key (e.g. Material)" value={s.key} onChange={(e) => { const n = [...specs]; n[i].key = e.target.value; setSpecs(n); }} className={INPUT} />
                <input placeholder="Value" value={s.value} onChange={(e) => { const n = [...specs]; n[i].value = e.target.value; setSpecs(n); }} className={INPUT} />
                <button type="button" onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="rounded-lg border border-stroke px-3 text-sm text-waterloo hover:border-red-400 hover:text-red-600 dark:border-strokedark">×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setSpecs([...specs, { key: "", value: "" }])} className="mt-3 text-sm font-medium text-primary hover:underline">
            + Add Specification
          </button>
        </div>

        {/* Variations */}
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
          <h2 className="mb-1 text-base font-semibold text-black dark:text-white">Variations</h2>
          <p className="mb-4 text-xs text-waterloo">Optional size or type options shown on the product page (e.g. 18nm, 16nm, Small, Large).</p>
          <div className="space-y-2">
            {variations.map((v, i) => (
              <div key={i} className="flex gap-2">
                <input
                  placeholder="Size / type (e.g. 18 cm, 7&quot;)"
                  value={v.name}
                  onChange={(e) => { const n = [...variations]; n[i].name = e.target.value; setVariations(n); }}
                  className={INPUT}
                />
                <input
                  placeholder="Catalog # (e.g. 01-100-18)"
                  value={v.catalogNumber}
                  onChange={(e) => { const n = [...variations]; n[i].catalogNumber = e.target.value; setVariations(n); }}
                  className={INPUT}
                />
                <button type="button" onClick={() => setVariations(variations.filter((_, j) => j !== i))} className="rounded-lg border border-stroke px-3 text-sm text-waterloo hover:border-red-400 hover:text-red-600 dark:border-strokedark">×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setVariations([...variations, { name: "", catalogNumber: "" }])} className="mt-3 text-sm font-medium text-primary hover:underline">
            + Add Variation
          </button>
        </div>

        {/* Categories */}
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
          <h2 className="mb-4 text-base font-semibold text-black dark:text-white">Categories</h2>
          {parents.length === 0 ? (
            <p className="text-sm text-waterloo">No categories available.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {parents.map((parent) => {
                const subs = allCategories.filter((c) => c.parentId === parent.id);
                return (
                  <div key={parent.id} className="rounded-lg border border-stroke p-3 dark:border-strokedark">
                    <label className="flex cursor-pointer items-center gap-2 font-medium text-sm text-black dark:text-white">
                      <input type="checkbox" checked={selectedCategoryIds.includes(parent.id)} onChange={() => toggleCategory(parent.id)} className="accent-primary" />
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${parent.type === "INSTRUMENT" ? "bg-primary/10 text-primary" : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"}`}>{parent.type}</span>
                      {parent.name}
                    </label>
                    {subs.length > 0 && (
                      <div className="mt-2 ml-5 space-y-1">
                        {subs.map((sub) => (
                          <label key={sub.id} className="flex cursor-pointer items-center gap-2 text-xs text-waterloo hover:text-black dark:hover:text-white">
                            <input type="checkbox" checked={selectedCategoryIds.includes(sub.id)} onChange={() => toggleCategory(sub.id)} className="accent-primary" />
                            {sub.name}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={status === "saving"} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60">
            {status === "saving" ? "Saving…" : "Create Product"}
          </button>
          <Link href="/admin/products" className="rounded-lg border border-stroke px-6 py-2.5 text-sm font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
