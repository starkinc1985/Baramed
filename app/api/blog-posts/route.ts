import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const takeRaw = url.searchParams.get("take");
  const take = takeRaw ? Number(takeRaw) : undefined;

  await connectDB();

  let q = BlogPost.find({ published: true }).sort({ publishedAt: -1 });
  if (Number.isFinite(take) && take! > 0) q = q.limit(take!);

  const posts = await q.lean();

  return NextResponse.json({ posts });
}
