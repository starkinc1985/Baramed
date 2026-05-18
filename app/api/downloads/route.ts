export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Download } from "@/models/Download";

export async function GET() {
  await connectDB();

  const downloads = await Download.find({ published: true }).sort({ category: 1, sortOrder: 1 }).lean();

  return NextResponse.json({ downloads });
}
