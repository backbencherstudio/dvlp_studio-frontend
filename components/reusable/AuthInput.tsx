import React, { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface AuthInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  type?: string;
  name: string;
  id?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;   // Example: <EmailIcon />
  className?: string;
  isDarkMode?: boolean;  // Optional prop to switch between light and dark modes
}

export default function AuthInput({
  type = "text",
  name,
  id,
  placeholder,
  value,
  onChange,
  icon,
  autoComplete,
  disabled,
  className = "",
  isDarkMode = true, // Default is light mode
  ...rest
}: AuthInputProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        className={[
          "w-full h-[57.33px] rounded-xl",
          // For dark mode
          isDarkMode
            ? " text-white placeholder:text-gray-400 border border-[rgba(255,255,255,0.20)]"
            // For light (default) mode
            : "bg-[#f9f9f9] text-black placeholder:text-gray-300 border border-[rgba(0,0,0,0.10)]",
          `focus:outline-none focus:ring-0 ${icon ? "pl-[48.66px]" : "pl-4"}`,
          className,
        ].join(" ")}
        {...rest}
      />
    </div>
  );
}
