"use client";

import { useForm } from "react-hook-form";
import { privateAxios } from "@/lib/axios";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface FormValues {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export default function PasswordUpdate() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user } = useAuth();

  const newPassword = watch("new_password");

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const res = await privateAxios.post("/auth/change-password", {
        email: user?.email,
        old_password: data.old_password,
        new_password: data.new_password,
      });

      console.log("Password updated:", res.data);
      toast.success("Password updated successfully");
      reset();
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to update password";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Reusable password input with eye toggle
  const PasswordInput = ({
    id,
    label,
    show,
    onToggle,
    registration,
    error,
  }: {
    id: string;
    label: string;
    show: boolean;
    onToggle: () => void;
    registration: any;
    error?: string;
  }) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          {...registration}
          className="w-full border rounded-lg px-4 py-3 pr-11 focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none disabled:bg-gray-100 disabled:text-gray-500 transition-colors"
          disabled={loading}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          tabIndex={-1}
          aria-label={show ? `Hide ${label}` : `Show ${label}`}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border mt-6"
    >
      {/* Header */}
      <div className="flex gap-4 px-6 pt-6 justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">Update Password</h2>
          {user?.email && (
            <p className="text-sm text-gray-500 mt-1">
              Updating password for: {user.email}
            </p>
          )}
        </div>

        <div className="pb-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#04043b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#02002c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
        {/* Email — read-only, no eye toggle needed */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
            disabled
          />
        </div>

        {/* Old Password */}
        <PasswordInput
          id="old_password"
          label="Old Password"
          show={showOldPassword}
          onToggle={() => setShowOldPassword((v) => !v)}
          registration={register("old_password", {
            required: "Old password is required",
          })}
          error={errors.old_password?.message}
        />

        {/* New Password */}
        <PasswordInput
          id="new_password"
          label="New Password"
          show={showNewPassword}
          onToggle={() => setShowNewPassword((v) => !v)}
          registration={register("new_password", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={errors.new_password?.message}
        />

        {/* Confirm Password */}
        <PasswordInput
          id="confirm_password"
          label="Confirm Password"
          show={showConfirmPassword}
          onToggle={() => setShowConfirmPassword((v) => !v)}
          registration={register("confirm_password", {
            required: "Please confirm your password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
          error={errors.confirm_password?.message}
        />
      </div>
    </form>
  );
}