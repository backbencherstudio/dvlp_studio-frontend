"use client";

import { useState } from "react";
import { privateAxios } from "@/lib/axios";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const emailFromQuery = searchParams.get("email") || "";

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
      // router.push("/auth/login"); // redirect to login page
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Show email readonly */}
        <input
          type="email"
          value={emailFromQuery}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />

        <input
          type="text"
          placeholder="OTP Code"
          className="w-full border px-3 py-2 rounded"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
