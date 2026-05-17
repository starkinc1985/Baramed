import { NextResponse } from "next/server";
import { requireAdmin, unauthorized, notFound } from "@/lib/admin/require-admin";
import { connectDB } from "@/lib/db";
import { Video } from "@/models/Video";
import mongoose from "mongoose";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const video = await Video.findById(params.id).lean();
  if (!video) return notFound();
  return NextResponse.json({ video });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const body = await req.json();
  try {
    const video = await Video.findByIdAndUpdate(params.id, { $set: body }, { new: true, runValidators: true });
    if (!video) return notFound();
    return NextResponse.json({ video });
  } catch (e: any) {
    if (e.code === 11000) return NextResponse.json({ error: "YouTube ID already in use" }, { status: 409 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return unauthorized();
  if (!mongoose.isValidObjectId(params.id)) return notFound();
  await connectDB();
  const deleted = await Video.findByIdAndDelete(params.id);
  if (!deleted) return notFound();
  return NextResponse.json({ ok: true });
}
