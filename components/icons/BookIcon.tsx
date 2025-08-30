import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function BookIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      className={className}
    >
      <path
        d="M1.33325 2.33H5.33325C6.0405 2.33 6.71877 2.61095 7.21887 3.11105C7.71897 3.61115 7.99992 4.28942 7.99992 4.99667V14.33C7.99992 13.7996 7.78921 13.2909 7.41413 12.9158C7.03906 12.5407 6.53035 12.33 5.99992 12.33H1.33325V2.33Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 2.33H10.6667C9.95942 2.33 9.28115 2.61095 8.78105 3.11105C8.28095 3.61115 8 4.28942 8 4.99667V14.33C8 13.7996 8.21071 13.2909 8.58579 12.9158C8.96086 12.5407 9.46957 12.33 10 12.33H14.6667V2.33Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
