"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface AuthSelectProps {
  id?: string;
  placeholder?: string;
  options: Option[];
  error?: { message?: string };
  value?: string; // controlled value
  onValueChange?: (value: string) => void; // controlled change
  isInvalid?: boolean;
}

export function AuthSelect({
  id,
  placeholder = "Select an option",
  options,
  error,
  value,
  onValueChange,
}: AuthSelectProps) {
  // ensure placeholder shows when value is empty
  const controlledValue = value ?? "";

  return (
    <div className="w-full">
      <Select value={controlledValue} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className={[
            "w-full rounded-xl",
            "py-[26px] px-4",
            "border border-[rgba(255,255,255,0.20)]",
            // "bg-white/5 backdrop-blur-[5px]",
            "text-white text-base data-[placeholder]:text-gray-300",
            "focus:outline-none focus:ring-0 focus:ring-white/30",
            "[&_svg]:!text-gray-400 [&_svg]:w-5 [&_svg]:h-5",
            "[&_svg]:opacity-100",

            error ? "border-red-400 focus:ring-red-300" : "",
          ].join(" ")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="bg-[#3e1c79] text-white border-white/20">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error?.message && (
        <p className="mt-2 text-[13px] text-red-300">{error.message}</p>
      )}
    </div>
  );
}
