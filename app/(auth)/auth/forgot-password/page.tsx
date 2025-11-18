"use client";

import { useState } from "react";
import { privateAxios } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await privateAxios.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email");

      // Redirect to reset-password page with email in query
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        className="w-[clamp(150px,12vw,225.055px)] h-auto "
        src="/evolve-logo.png"
        alt=""
        width={225}
        height={100}
      />
      <div className="max-w-md mx-auto mt-6 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full border px-3 py-2 rounded text-white"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
