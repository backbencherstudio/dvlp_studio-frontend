import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function ClockIcon({ className, size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" className={className}>
<path d="M10.0091 18.9938C14.6115 18.9938 18.3424 15.2629 18.3424 10.6605C18.3424 6.05811 14.6115 2.32715 10.0091 2.32715C5.40674 2.32715 1.67578 6.05811 1.67578 10.6605C1.67578 15.2629 5.40674 18.9938 10.0091 18.9938Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.0078 5.66016V10.6602L13.3411 12.3268" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
}