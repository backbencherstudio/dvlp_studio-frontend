import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function UserIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      className={className}
    >
      <path
        d="M13.3765 14.67V13.3367C13.3765 12.6295 13.0956 11.9512 12.5955 11.4511C12.0954 10.951 11.4171 10.67 10.7099 10.67H6.70988C6.00264 10.67 5.32436 10.951 4.82426 11.4511C4.32416 11.9512 4.04321 12.6295 4.04321 13.3367V14.67"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.70988 8.00338C10.1826 8.00338 11.3765 6.80947 11.3765 5.33671C11.3765 3.86395 10.1826 2.67004 8.70988 2.67004C7.23712 2.67004 6.04321 3.86395 6.04321 5.33671C6.04321 6.80947 7.23712 8.00338 8.70988 8.00338Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
