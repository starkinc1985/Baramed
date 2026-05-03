import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { CategoryType } from "@prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");

  const where =
    type === "INSTRUMENT"
      ? { type: CategoryType.INSTRUMENT }
      : type === "SURGERY"
        ? { type: CategoryType.SURGERY }
        : undefined;

  const categories = await prisma.category.findMany({
    where,
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });

  return NextResponse.json({ categories });
}

