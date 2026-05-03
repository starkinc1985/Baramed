import { cookies } from "next/headers";
import { verifyAdminToken, type AdminJwtPayload } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";

export async function getAdminSession(): Promise<AdminJwtPayload | null> {
  const token = cookies().get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
