import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function CursorIcon({ className, size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" className={className}>
<path d="M3.49414 3.3335L9.38581 17.5002L11.4775 11.3418L17.6608 9.22516L3.49414 3.3335Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
}