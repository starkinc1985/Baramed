import { NextResponse } from "next/server";
import { requireAdmin, unauthorized } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const filter: any = status ? { status } : {};
  const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 }).lean();
  const withCounts = inquiries.map((i: any) => ({ ...i, id: i._id.toString(), _count: { items: i.items?.length ?? 0 } }));
  return NextResponse.json({ inquiries: withCounts });
}
