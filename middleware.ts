import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  email: string;
  sub: string;
  type: "admin" | "student" | "teacher";
  exp: number;
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  if (!token) {
    if (pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(new URL("/admin/sign-in", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  let role: string | null = null;
  try {
    const decoded: TokenPayload = jwtDecode(token);
    role = decoded.type;
    console.log("Role", role);
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
