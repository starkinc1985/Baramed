"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ImportResult = {
  imported: number;
  skipped: number;
  inFileDuplicates: number;
  dbDuplicates: number;
  categoriesCreated: number;
  total: number;
};

export default function ImportButton() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("loading");
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/import/instruments", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Import failed");
        setStatus("error");
      } else {
        setResult(data);
        setStatus("done");
        router.refresh();
      }
    } catch {
      setError("Network error — check console");
      setStatus("error");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFile}
      />

      {status === "done" && result && (
        <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-300">
          <span className="leading-relaxed">
            Imported <strong>{result.imported}</strong> of <strong>{result.total}</strong>
            {result.inFileDuplicates > 0 && (
              <> · <strong>{result.inFileDuplicates}</strong> duplicate{result.inFileDuplicates !== 1 ? "s" : ""} in file</>
            )}
            {result.dbDuplicates > 0 && (
              <> · <strong>{result.dbDuplicates}</strong> already in DB</>
            )}
            {result.categoriesCreated > 0 && (
              <> · <strong>{result.categoriesCreated}</strong> new {result.categoriesCreated !== 1 ? "categories" : "category"}</>
            )}
          </span>
          <button
            onClick={() => setStatus("idle")}
            className="ml-1 shrink-0 font-bold leading-none hover:opacity-70"
          >
            ×
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400">
          <span>{error}</span>
          <button
            onClick={() => setStatus("idle")}
            className="ml-1 font-bold leading-none hover:opacity-70"
          >
            ×
          </button>
        </div>
      )}

      <button
        disabled={status === "loading"}
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-1.5 rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-black transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:text-white"
      >
        {status === "loading" ? (
          <>
            <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Importing…
          </>
        ) : (
          <>
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Import Excel
          </>
        )}
      </button>
    </div>
  );
}
