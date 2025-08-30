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
          "border border-[rgba(255,255,255,0.20)]",
          "[background:rgba(255,255,255,0.10)] text-white placeholder:text-gray-300",
          ` focus:outline-none focus:ring-0 ${icon ? "pl-[48.66px]": "pl-4"}`,
          className,
        ].join(" ")}
        {...rest}
      />
    </div>
  );
}
