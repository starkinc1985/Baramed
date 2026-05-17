import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  await connectDB();

  const query: any = {};
  if (type === "INSTRUMENT" || type === "SURGERY") {
    query.type = type;
  }

  const categories = await Category.find(query).sort({ type: 1, name: 1 }).lean();

  return NextResponse.json({ categories });
}
