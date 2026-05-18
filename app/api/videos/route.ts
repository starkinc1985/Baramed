export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Video } from "@/models/Video";

export async function GET() {
  await connectDB();

  const videos = await Video.find().sort({ sortOrder: 1, createdAt: -1 }).lean();

  return NextResponse.json({ videos });
}
