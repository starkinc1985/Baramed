import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ADMIN_TOKEN_COOKIE, adminCookieOptions } from "@/lib/auth/constants";

export async function POST() {
  cookies().set(ADMIN_TOKEN_COOKIE, "", { ...adminCookieOptions(0), maxAge: 0 });
  return NextResponse.json({ ok: true });
}
