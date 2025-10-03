import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  email: string;
  sub: string;
  type: "admin" | "student" | "teacher";
  exp: number;
};

const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔹 If in mock mode → just inject a fake role
  if (isMockAuth) {
    let mockRole: "admin" | "student" | "teacher" = "student"; // default

    if (pathname.startsWith("/admin-dashboard")) mockRole = "admin";
    if (pathname.startsWith("/tutor-portal")) mockRole = "teacher";
    if (pathname.startsWith("/student-portal")) mockRole = "student";

    req.nextUrl.searchParams.set("mockRole", mockRole); // just for debugging
    return NextResponse.next();
  }

  // 🔹 Normal auth flow
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    if (pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(
        new URL(`/admin/sign-in?callbackUrl=${pathname}`, req.url)
      );
    }
    if (pathname.startsWith("/tutor-portal")) {
      return NextResponse.redirect(
        new URL(`/tutor/sign-in?callbackUrl=${pathname}`, req.url)
      );
    }
    if (pathname.startsWith("/student-portal")) {
      return NextResponse.redirect(
        new URL(`/student/sign-in?callbackUrl=${pathname}`, req.url)
      );
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  let role: string | null = null;
  try {
    const decoded: TokenPayload = jwtDecode(token);
    role = decoded.type;
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/student-portal") && role !== "student") {
    return NextResponse.redirect(new URL("/student/sign-in", req.url));
  }
  if (pathname.startsWith("/tutor-portal") && role !== "teacher") {
    return NextResponse.redirect(new URL("/tutor/sign-in", req.url));
  }
  if (pathname.startsWith("/admin-dashboard") && role !== "admin") {
    return NextResponse.redirect(new URL("/admin/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student-portal/:path*",
    "/tutor-portal/:path*",
    "/admin-dashboard/:path*",
  ],
};
