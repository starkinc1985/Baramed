import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ videos });
}
