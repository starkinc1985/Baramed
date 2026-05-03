"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAdminUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to create user");
        setStatus("idle");
        return;
      }
      setStatus("done");
      setEmail("");
      setName("");
      setPassword("");
    } catch {
      setError("Request failed");
      setStatus("idle");
    }
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
        Create administrator
      </h1>
      <p className="mb-6 text-sm text-waterloo">
        New accounts use the <strong>Administrator</strong> role. Minimum password length is 8
        characters.
      </p>
      {status === "done" && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-100">
          User created. You can create another or return to{" "}
          <button
            type="button"
            className="font-medium text-primary underline"
            onClick={() => router.push("/admin/apis")}
          >
            APIs
          </button>
          .
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900/40 dark:bg-red-900/20">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-md space-y-4 rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-black dark:text-white">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-black dark:border-strokedark dark:text-white"
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
            className="w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-black dark:border-strokedark dark:text-white"
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
            className="w-full rounded-lg border border-stroke bg-transparent px-3 py-2 text-black dark:border-strokedark dark:text-white"
          />
        </div>
        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white transition hover:bg-primaryho disabled:opacity-60"
        >
          {status === "saving" ? "Creating…" : "Create administrator"}
        </button>
      </form>
    </div>
  );
}
