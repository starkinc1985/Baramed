import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";

import { signAdminToken } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE, adminCookieOptions } from "@/lib/auth/constants";
import { verifyPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { requiredString } from "@/lib/validators";

const WEEK = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = requiredString(body.email, "email").toLowerCase();
    const password = requiredString(body.password, "password");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user?.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (user.role !== UserRole.ADMINISTRATOR) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await signAdminToken({
      sub: user.id,
      email: user.email,
      role: "ADMINISTRATOR",
    });

    cookies().set(ADMIN_TOKEN_COOKIE, token, adminCookieOptions(WEEK));

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Bad request" },
      { status: 400 },
    );
  }
}
