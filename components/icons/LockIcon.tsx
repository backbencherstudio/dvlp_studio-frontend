import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function EmailIcon({ className, size = 24 }: IconProps) {
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
        d="M16.5033 9.16675H4.83659C3.91611 9.16675 3.16992 9.91294 3.16992 10.8334V16.6667C3.16992 17.5872 3.91611 18.3334 4.83659 18.3334H16.5033C17.4237 18.3334 18.1699 17.5872 18.1699 16.6667V10.8334C18.1699 9.91294 17.4237 9.16675 16.5033 9.16675Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.50317 9.16675V5.83341C6.50317 4.72835 6.94216 3.66854 7.72356 2.88714C8.50496 2.10573 9.56477 1.66675 10.6698 1.66675C11.7749 1.66675 12.8347 2.10573 13.6161 2.88714C14.3975 3.66854 14.8365 4.72835 14.8365 5.83341V9.16675"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
