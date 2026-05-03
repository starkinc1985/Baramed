export const ADMIN_TOKEN_COOKIE = "baramed_admin_token";

export function adminCookieOptions(maxAgeSec: number) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}
