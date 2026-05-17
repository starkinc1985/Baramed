import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Download } from "@/models/Download";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const download = await Download.findById(params.id).lean();
  if (!download) return notFound();
  return NextResponse.json({ download });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const body = await req.json();
  const download = await Download.findByIdAndUpdate(params.id, { $set: body }, { new: true, runValidators: true });
  if (!download) return notFound();
  return NextResponse.json({ download });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const deleted = await Download.findByIdAndDelete(params.id);
  if (!deleted) return notFound();
  return NextResponse.json({ ok: true });
}
