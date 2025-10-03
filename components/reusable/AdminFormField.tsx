"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input"; // adjust to your Input path

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  placeHolder?: string;
}

export default function FormField({
  label,
  id,
  type = "text",
  register,
  error,
  className = "",
  placeHolder= "",
}: FormFieldProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block font-medium leading-[160%] tracking-[0.08px] text-[#4A4C56]"
      >
        {label}
      </label>

      <Input
        id={id}
        type={type}
        {...register}
        className={`w-full px-3.5 py-2 border border-[#DFE1E7] focus:outline-0 outline-none ${className}`}
        placeholder={placeHolder}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
