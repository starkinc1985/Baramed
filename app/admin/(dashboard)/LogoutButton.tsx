"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg border border-stroke px-3 py-1.5 text-sm text-waterloo transition hover:border-primary hover:text-primary dark:border-strokedark"
    >
      Log out
    </button>
  );
}
