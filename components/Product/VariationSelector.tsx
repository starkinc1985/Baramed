"use client";

import { useState } from "react";
import type { ProductVariation } from "@/types/product";

export default function VariationSelector({ variations }: { variations: ProductVariation[] }) {
  const [selected, setSelected] = useState<string>(variations[0]?.id ?? "");

  if (variations.length === 0) return null;

  return (
    <div className="mb-6 rounded-lg border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
      <h2 className="mb-3 text-xl font-semibold text-black dark:text-white">Variations</h2>
      <div className="flex flex-wrap gap-2">
        {variations.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setSelected(v.id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              selected === v.id
                ? "border-primary bg-primary text-white"
                : "border-stroke text-black hover:border-primary hover:text-primary dark:border-strokedark dark:text-white dark:hover:border-primary dark:hover:text-primary"
            }`}
          >
            {v.name}
          </button>
        ))}
      </div>
    </div>
  );
}
