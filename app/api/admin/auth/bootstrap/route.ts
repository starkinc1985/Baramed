import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";

import { signAdminToken } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE, adminCookieOptions } from "@/lib/auth/constants";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { optionalString, requiredString } from "@/lib/validators";

const WEEK = 60 * 60 * 24 * 7;

/**
 * One-time: create the first user when the database has zero users.
 * Disabled once any user exists.
 */
export async function POST(req: Request) {
  const count = await prisma.user.count();
  if (count > 0) {
    return NextResponse.json(
      { error: "Bootstrap is only available when no users exist" },
      { status: 403 },
    );
  }

  try {
    const body = await req.json();
    const email = requiredString(body.email, "email").toLowerCase();
    const password = requiredString(body.password, "password");
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }
    const name = optionalString(body.name);

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: UserRole.ADMINISTRATOR,
      },
    });

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
