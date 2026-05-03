import { verifyAdminToken, type AdminJwtPayload } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";

export function getTokenFromCookieHeader(header: string | null): string | null {
  if (!header) return null;
  const parts = header.split(";").map((c) => c.trim());
  for (const p of parts) {
    if (p.startsWith(`${ADMIN_TOKEN_COOKIE}=`)) {
      return decodeURIComponent(p.slice(ADMIN_TOKEN_COOKIE.length + 1));
    }
  }
  return null;
}

export async function getAdminFromCookieString(
  cookieHeader: string | null,
): Promise<AdminJwtPayload | null> {
  const token = getTokenFromCookieHeader(cookieHeader);
  if (!token) return null;
  return verifyAdminToken(token);
}
