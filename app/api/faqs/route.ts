export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Faq } from "@/models/Faq";

export async function GET() {
  await connectDB();

  const faqs = await Faq.find({ published: true }).sort({ sortOrder: 1 }).lean();

  return NextResponse.json({ faqs });
}
