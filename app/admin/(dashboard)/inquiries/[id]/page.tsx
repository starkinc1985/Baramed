"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const STATUSES = ["NEW", "IN_PROGRESS", "CLOSED"];

export default function InquiryDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [inquiry, setInquiry] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "deleting">("idle");

  useEffect(() => {
    fetch(`/api/admin/inquiries/${id}`).then((r) => r.json()).then((d) => {
      setInquiry(d.inquiry);
      setLoading(false);
    });
  }, [id]);

  async function handleStatusChange(newStatus: string) {
    setStatus("saving");
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setInquiry((prev: any) => ({ ...prev, status: newStatus }));
    setStatus("idle");
  }

  async function handleDelete() {
    if (!confirm("Delete this inquiry?")) return;
    setStatus("deleting");
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    router.push("/admin/inquiries");
  }

  if (loading) return <div className="py-12 text-center text-sm text-waterloo">Loading…</div>;
  if (!inquiry) return <div className="py-12 text-center text-sm text-waterloo">Not found.</div>;

  const statusColors: Record<string, string> = {
    NEW: "bg-primary/10 text-primary",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    CLOSED: "bg-gray-100 text-waterloo dark:bg-strokedark",
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/inquiries" className="text-sm text-waterloo hover:text-primary">← Inquiries</Link>
          <h1 className="text-2xl font-bold text-black dark:text-white">Inquiry Detail</h1>
        </div>
        <button type="button" onClick={handleDelete} disabled={status === "deleting"} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60">
          {status === "deleting" ? "Deleting…" : "Delete"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[inquiry.status]}`}>{inquiry.status.replace("_", " ")}</span>
              <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-waterloo dark:bg-strokedark">{inquiry.type}</span>
            </div>
            <div className="flex gap-2">
              {STATUSES.filter((s) => s !== inquiry.status).map((s) => (
                <button key={s} onClick={() => handleStatusChange(s)} disabled={status === "saving"}
                  className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-medium text-black transition hover:border-primary hover:text-primary dark:border-strokedark dark:text-white disabled:opacity-60">
                  Mark {s.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
          <h2 className="mb-4 text-base font-semibold text-black dark:text-white">Contact Information</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {[["Name", inquiry.name], ["Email", inquiry.email], ["Phone", inquiry.phone ?? "—"], ["Company", inquiry.company ?? "—"], ["Subject", inquiry.subject ?? "—"]].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-medium text-waterloo">{k}</dt>
                <dd className="text-black dark:text-white">{v}</dd>
              </div>
            ))}
            <div className="col-span-2">
              <dt className="text-xs font-medium text-waterloo">Date</dt>
              <dd className="text-black dark:text-white">{new Date(inquiry.createdAt).toLocaleString()}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
          <h2 className="mb-3 text-base font-semibold text-black dark:text-white">Message</h2>
          <p className="whitespace-pre-wrap text-sm text-waterloo">{inquiry.message}</p>
        </div>

        {inquiry.items?.length > 0 && (
          <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
            <h2 className="mb-3 text-base font-semibold text-black dark:text-white">Products Requested ({inquiry.items.length})</h2>
            <div className="space-y-2">
              {inquiry.items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-strokedark">
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">{item.productNameSnapshot ?? "—"}</p>
                    <p className="font-mono text-xs text-waterloo">{item.productCodeSnapshot}</p>
                    {item.notes && <p className="mt-1 text-xs text-waterloo">Note: {item.notes}</p>}
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {inquiry.attachments?.length > 0 && (
          <div className="rounded-xl border border-stroke bg-white p-6 dark:border-strokedark dark:bg-blacksection">
            <h2 className="mb-3 text-base font-semibold text-black dark:text-white">Attachments</h2>
            <ul className="space-y-1">
              {inquiry.attachments.map((att: any) => (
                <li key={att.id} className="text-sm text-waterloo">{att.fileName} {att.size ? `(${Math.round(att.size / 1024)} KB)` : ""}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
