"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          const from = searchParams.get("from");
          router.replace(from && from.startsWith("/admin") ? from : "/admin/apis");
        }
      })
      .catch(() => {});
  }, [router, searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      const from = searchParams.get("from");
      router.push(from && from.startsWith("/admin") ? from : "/admin/apis");
      router.refresh();
    } catch {
      setError("Request failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-stroke bg-white p-8 dark:border-strokedark dark:bg-blacksection">
        <h1 className="mb-1 text-2xl font-bold text-black dark:text-white">Admin sign in</h1>
        <p className="mb-6 text-sm text-waterloo">Administrator access only</p>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-200">
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
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="current-password"
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
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-waterloo">
          First time?{" "}
          <Link href="/admin/setup" className="font-medium text-primary hover:underline">
            Create the first administrator
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
          <p className="text-sm text-waterloo">Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
