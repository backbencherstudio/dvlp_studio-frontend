"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  const isProd = process.env.NODE_ENV === "production";
useEffect(() => {
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const callbackUrl =
    searchParams.get("callbackUrl") || "/student-portal";

  if (!accessToken || !refreshToken) {
    window.location.href = "/auth/sign-in?error=google_failed";
    return;
  }

  const isProd = process.env.NODE_ENV === "production";

  Cookies.set("access_token", accessToken, {
    secure: isProd,
    sameSite: "lax",
  });

  Cookies.set("refresh_token", refreshToken, {
    secure: isProd,
    sameSite: "lax",
  });

  // 🔥 Important
// force reload with slight delay
setTimeout(() => {
  window.location.href = callbackUrl;
}, 1000);

}, [searchParams]);


  return (
    <div className="flex items-center justify-center h-screen text-white">
      Signing you in with Google...
    </div>
  );
}
