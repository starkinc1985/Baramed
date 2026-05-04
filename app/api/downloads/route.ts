import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const downloads = await prisma.download.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  return NextResponse.json({ downloads });
}
