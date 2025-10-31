"use client";

import React from "react";
import { useForm } from "react-hook-form";
import EmailIcon from "../icons/EmailIcon";
import AuthInput from "../reusable/AuthInput";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import EyeIcon from "../icons/EyeIcon";
import { EyeClosed, Loader, LockIcon } from "lucide-react";
import ErrorMessage from "../reusable/ErrorMessage";
import ArrowIcon from "../icons/ArrowIcon";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  showPassword: boolean;
};

export default function StudentSignIn() {
  const { login, error } = useAuth();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("callbackUrl") || "/student-portal";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // ✅ watch a "virtual" value (not part of form schema)
  const showPassword = watch("showPassword", false);


  // Redirect to student portal when user is successfully logged in
  // useEffect(() => {
  //   if (user && !loading && !error) {
  //     router.push("/student-portal");
  //   }
  // }, [user, loading, error, router]);

  const onSubmit = async (data: FormValues) => {
    // console.log("payload:", data);
    const { email, password, rememberMe } = data;
    // console.log("🚀 StudentSignIn - redirectPath:", redirectPath);
    await login(email, password, rememberMe, redirectPath, "student");
  };

  return (
    <section className="border [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] rounded-3xl border-solid border-[rgba(255,255,255,0.20)] mt-8 p-8 w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="md:space-y-5 space-y-8">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-white text-sm font-medium leading-5 mb-2 block"
            >
              Email Address
            </label>
            <AuthInput
              id="email"
              type="email"
              placeholder="Enter your email"
              icon={<EmailIcon />}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            <ErrorMessage error={errors.email} />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-white text-sm font-medium leading-5 mb-2 block"
            >
              Password
            </label>
            <div className="relative">
              <AuthInput
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                icon={<LockIcon />}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setValue("showPassword" as any, !showPassword)}
                className="text-gray-400 absolute top-1/2 right-4 -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>

            <ErrorMessage error={errors.password} />
          </div>

          {/* remember me */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={watch("rememberMe")}
                onCheckedChange={(checked) =>
                  setValue("rememberMe", Boolean(checked))
                }
                className="w-4 h-4 shrink-0 border [background:#FFF] rounded-[2.5px] border-solid border-[#767676] data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
              />
              <p className="shrink-0 text-gray-300 text-sm leading-5">
                Remember me
              </p>
            </div>
            <Link className="text-[#C084FC] text-sm leading-5" href={"/"}>
              Forgot Password
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center items-center gap-[7.637px] [background:linear-gradient(90deg,#6366F1_0%,#A855F7_100%)] px-0 py-4 rounded-xl text-white w-full cursor-pointer hover:[background:linear-gradient(90deg,#A855F7_0%,#6366F1_100%)] transition-colors duration-300 text-base font-bold leading-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <>{"Signing In..."}  <Loader className="w-5 h-5 animate-spin" /></> : <>{"Sign In"}  <ArrowIcon /></>}

          </button>
        </div>
      </form>
      {error && (
        <p
          className="mt-5 text-center text-orange-400 font-semibold text-sm"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </section>
  );
}
