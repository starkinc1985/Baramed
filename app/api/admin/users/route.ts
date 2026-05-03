import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";

import { verifyAdminToken } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { optionalString, requiredString } from "@/lib/validators";

async function requireAdmin() {
  const token = cookies().get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) return null;
  const p = await verifyAdminToken(token);
  if (!p) return null;
  const user = await prisma.user.findUnique({ where: { id: p.sub } });
  if (!user || user.role !== UserRole.ADMINISTRATOR || !user.passwordHash) {
    return null;
  }
  return user;
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: UserRole.ADMINISTRATOR,
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Bad request" },
      { status: 400 },
    );
  }
}
