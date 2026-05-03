"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SetupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not create administrator");
        setLoading(false);
        return;
      }
      router.push("/admin/apis");
      router.refresh();
    } catch {
      setError("Request failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
        <h1 className="mb-1 text-2xl font-bold text-black dark:text-white">
          Create first administrator
        </h1>
        <p className="mb-6 text-sm text-waterloo">
          This form is only available when no users exist. Role: <strong>Administrator</strong>
          . Password at least 8 characters.
        </p>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-900/20">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent px-3 py-2.5 text-black dark:border-strokedark dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Name (optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent px-3 py-2.5 text-black dark:border-strokedark dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent px-3 py-2.5 text-black dark:border-strokedark dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create administrator & sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-waterloo">
          <Link href="/admin/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
