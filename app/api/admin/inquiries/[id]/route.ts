import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const inquiry = await Inquiry.findById(params.id).lean();
  if (!inquiry) return notFound();
  return NextResponse.json({ inquiry });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const body = await req.json();
  const inquiry = await Inquiry.findByIdAndUpdate(params.id, { $set: { status: body.status } }, { new: true });
  if (!inquiry) return notFound();
  return NextResponse.json({ inquiry });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const deleted = await Inquiry.findByIdAndDelete(params.id);
  if (!deleted) return notFound();
  return NextResponse.json({ ok: true });
}
