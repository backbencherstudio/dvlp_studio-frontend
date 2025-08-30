import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function EyeIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      className={className}
    >
      <path
        d="M1.99658 10.0001C1.99658 10.0001 4.49658 4.16675 10.3299 4.16675C16.1632 4.16675 18.6632 10.0001 18.6632 10.0001C18.6632 10.0001 16.1632 15.8334 10.3299 15.8334C4.49658 15.8334 1.99658 10.0001 1.99658 10.0001Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3298 12.5C11.7105 12.5 12.8298 11.3807 12.8298 10C12.8298 8.61929 11.7105 7.5 10.3298 7.5C8.94912 7.5 7.82983 8.61929 7.82983 10C7.82983 11.3807 8.94912 12.5 10.3298 12.5Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
