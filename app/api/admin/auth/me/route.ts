import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
  const token = cookies().get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) return NextResponse.json({ user: null });
  const payload = await verifyAdminToken(token);
  if (!payload) return NextResponse.json({ user: null });
  await connectDB();
  const user = await User.findById(payload.sub).select("email name role").lean();
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user: { id: (user as any)._id.toString(), email: user.email, name: user.name, role: user.role } });
}
