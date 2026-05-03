import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyAdminToken } from "@/lib/auth/admin-jwt";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";

const PUBLIC_ADMIN_PAGES = new Set(["/admin/login", "/admin/setup"]);

const PUBLIC_ADMIN_APIS = new Set([
  "/api/admin/auth/login",
  "/api/admin/auth/logout",
  "/api/admin/auth/bootstrap",
  "/api/admin/auth/me",
]);

function redirectToLogin(request: NextRequest) {
  const login = new URL("/admin/login", request.url);
  login.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    if (PUBLIC_ADMIN_APIS.has(pathname)) {
      return NextResponse.next();
    }
    const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const p = await verifyAdminToken(token);
    if (!p) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (PUBLIC_ADMIN_PAGES.has(pathname)) {
      return NextResponse.next();
    }

    if (pathname === "/admin") {
      const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
      if (!token || !(await verifyAdminToken(token))) {
        return redirectToLogin(request);
      }
      return NextResponse.redirect(new URL("/admin/apis", request.url));
    }

    const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
    if (!token) {
      return redirectToLogin(request);
    }
    if (!(await verifyAdminToken(token))) {
      return redirectToLogin(request);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
