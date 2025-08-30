"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import EmailIcon from "../icons/EmailIcon";
import AuthInput from "../reusable/AuthInput";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import EyeIcon from "../icons/EyeIcon";
import { EyeClosed, LockIcon } from "lucide-react";
import ErrorMessage from "../reusable/ErrorMessage";
import { AuthSelect } from "../reusable/AuthSelect";
import ArrowIcon from "../icons/ArrowIcon";
import PhoneIcon from "../icons/PhoneIcon";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gradeLevel: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
};

export default function StudentSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", remember: false },
  });

  // ✅ watch a "virtual" value (not part of form schema)
  const showPassword = watch("showPassword", false);
  const showConfirmPassword = watch("showConfirmPassword", false)

  const onSubmit = (data: FormValues) => {
    console.log("payload:", data);
  };

  const gradeOptions = [
    { label: "6th Grade", value: "grade_6" },
    { label: "7th Grade", value: "grade_7" },
    { label: "8th Grade", value: "grade_8" },
    { label: "9th Grade", value: "grade_9" },
    { label: "10th Grade", value: "grade_10" },
    { label: "11th Grade", value: "grade_11" },
    { label: "12th Grade", value: "grade_12" },
  ];

  return (
    <section className="border [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] rounded-3xl border-solid border-[rgba(255,255,255,0.20)] mt-8 p-8 w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="md:space-y-5 space-y-8">
          {/* first and last name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="text-white text-sm font-medium leading-5 mb-2 block"
              >
                First Name
              </label>
              <AuthInput
                id="firstName"
                type="text"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
              <ErrorMessage error={errors.firstName} />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="text-white text-sm font-medium leading-5 mb-2 block"
              >
                Last Name
              </label>
              <AuthInput
                id="lastName"
                type="text"
                placeholder="Last name"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
              <ErrorMessage error={errors.lastName} />
            </div>
          </div>
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
          {/* phone number */}
          <div>
            <label
              htmlFor="phonenumber"
              className="text-white text-sm font-medium leading-5 mb-2 block"
            >
              Phone Number
            </label>
            <AuthInput
              id="phonenumber"
              type="phonenumber"
              placeholder="Enter your phone number"
              icon={<PhoneIcon />}
              {...register("phoneNumber", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid phonenumber",
                },
              })}
            />
            <ErrorMessage error={errors.phoneNumber} />
          </div>

          {/* Grade Level */}
          <div>
            <label
              htmlFor="gradeLevel"
              className="text-white text-sm font-medium leading-5 mb-2 block"
            >
              Grade Level
            </label>

            <Controller
              control={control}
              name="gradeLevel"
              rules={{ required: "Grade level is required" }}
              render={({ field }) => (
                <AuthSelect
                  id="gradeLevel"
                  placeholder="Select your grade level"
                  options={gradeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.gradeLevel}
                />
              )}
            />
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-white text-sm font-medium leading-5 mb-2 block"
            >
              Confirm Password
            </label>
            <div className="relative">
              <AuthInput
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                icon={<LockIcon />}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("confirmPassword") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setValue("showConfirmPassword" as any, !showConfirmPassword)}
                className="text-gray-400 absolute top-1/2 right-4 -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeClosed className="w-5 h-5" />
                )}
              </button>
            </div>

            <ErrorMessage error={errors.confirmPassword} />
          </div>

          {/* remember me */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Checkbox
                checked={watch("remember")}
                onCheckedChange={(checked) =>
                  setValue("remember", Boolean(checked))
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
           {isSubmitting ? "Signing Up..." : "Sign Up"}

             <ArrowIcon/>
          </button>
        </div>
      </form>
    </section>
  );
}
