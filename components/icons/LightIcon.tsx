import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function LightIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      className={className}
    >
      <path
        d="M10.0898 9.33334C10.2232 8.66668 10.5565 8.20001 11.0898 7.66668C11.7565 7.06668 12.0898 6.20001 12.0898 5.33334C12.0898 4.27248 11.6684 3.25506 10.9183 2.50492C10.1681 1.75477 9.15071 1.33334 8.08984 1.33334C7.02898 1.33334 6.01156 1.75477 5.26142 2.50492C4.51127 3.25506 4.08984 4.27248 4.08984 5.33334C4.08984 6.00001 4.22318 6.80001 5.08984 7.66668C5.55651 8.13334 5.95651 8.66668 6.08984 9.33334"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.08984 12H10.0898"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75586 14.6667H9.42253"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
