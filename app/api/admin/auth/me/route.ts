import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyAdminToken } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const token = cookies().get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  const payload = await verifyAdminToken(token);
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, name: true, role: true },
  });
  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  return NextResponse.json({ user });
}
