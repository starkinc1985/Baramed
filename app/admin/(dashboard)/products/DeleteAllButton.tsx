"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteAllButton() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  async function handleDeleteAll() {
    if (!confirm("Delete ALL products? This cannot be undone.")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/products", { method: "DELETE" });
      const data = await res.json();
      alert(`Deleted ${data.deleted} products.`);
      router.refresh();
    } catch {
      alert("Delete failed — please try again.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <button
      disabled={status === "loading"}
      onClick={handleDeleteAll}
      className="flex items-center gap-1.5 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-white"
    >
      {status === "loading" ? (
        <>
          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Deleting…
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Delete All
        </>
      )}
    </button>
  );
}
