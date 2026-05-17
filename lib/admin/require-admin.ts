import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function requireAdmin() {
  const token = cookies().get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyAdminToken(token);
  if (!payload) return null;
  await connectDB();
  const user = await User.findById(payload.sub).lean();
  if (!user || user.role !== "ADMINISTRATOR") return null;
  return user;
}

export const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export const notFound = (msg = "Not found") =>
  NextResponse.json({ error: msg }, { status: 404 });

export const badRequest = (msg: string) =>
  NextResponse.json({ error: msg }, { status: 400 });
