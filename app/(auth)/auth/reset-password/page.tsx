"use client";

import { useState } from "react";
import { privateAxios } from "@/lib/axios";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("type");
  const emailFromQuery = searchParams.get("email") || "";

  console.log(role)

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!emailFromQuery) {
      toast.error("Email is missing. Please start from Forgot Password page.");
      return;
    }

    try {
      await privateAxios.post("/auth/reset-password", {
        email: emailFromQuery,
        token,
        password,
      });

      toast.success("Password reset successful!");
      router.push(`/${role}/sign-in`); // redirect to login page
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div  className="border [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] rounded-3xl border-solid border-[rgba(255,255,255,0.20)] mt-8 p-8 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Show email readonly */}
        <input
          type="email"
          value={emailFromQuery}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100 focus:outline-0"
        />

        <input
          type="text"
          placeholder="OTP Code"
          className="w-full border px-3 py-2 rounded bg-white"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-3 py-2 rounded bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="flex justify-center items-center gap-[7.637px] [background:linear-gradient(90deg,#A855F7_0%,#EC4899_100%)]  px-0 py-4 rounded-xl text-white w-full cursor-pointer hover:[background:linear-gradient(90deg,#A855F7_0%,#6366F1_100%)] transition-colors duration-300 text-base font-bold leading-6 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
