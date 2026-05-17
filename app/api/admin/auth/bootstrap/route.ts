import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signAdminToken } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE, adminCookieOptions } from "@/lib/auth/constants";
import { hashPassword } from "@/lib/auth/password";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { optionalString, requiredString } from "@/lib/validators";

const WEEK = 60 * 60 * 24 * 7;

export async function POST(req: Request) {
  await connectDB();
  const count = await User.countDocuments();
  if (count > 0) return NextResponse.json({ error: "Bootstrap is only available when no users exist" }, { status: 403 });
  try {
    const body = await req.json();
    const email = requiredString(body.email, "email").toLowerCase();
    const password = requiredString(body.password, "password");
    if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    const name = optionalString(body.name);
    const passwordHash = await hashPassword(password);
    const user = await User.create({ email, name, passwordHash, role: "ADMINISTRATOR" });
    const token = await signAdminToken({ sub: user._id.toString(), email: user.email, role: "ADMINISTRATOR" });
    cookies().set(ADMIN_TOKEN_COOKIE, token, adminCookieOptions(WEEK));
    return NextResponse.json({ user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role } });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Bad request" }, { status: 400 });
  }
}
