"use client";

import { useState } from "react";
import { privateAxios } from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "student";

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await privateAxios.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email");

      // Redirect to reset-password page with email in query
      router.push(
        `/auth/reset-password?type=${type}&email=${encodeURIComponent(email)}`
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="border [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] rounded-3xl border-solid border-[rgba(255,255,255,0.20)] mt-8 p-8 max-w-md mx-auto">
      <Image
        className="w-[clamp(150px,12vw,225.055px)] h-auto mx-aut"
        src="/evolve-logo.png"
        alt=""
        width={225}
        height={100}
      />
      <div className="max-w-md mx-auto mt-6 p-6 border border-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Forgot Password
        </h2>
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
            className="justify-center items-center gap-[7.637px] [background:linear-gradient(90deg,#A855F7_0%,#EC4899_100%)]  px-0 py-4 rounded-xl text-white w-full cursor-pointer hover:[background:linear-gradient(90deg,#A855F7_0%,#6366F1_100%)] transition-colors duration-300 text-base font-bold leading-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
