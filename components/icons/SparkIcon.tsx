import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function SparkIcon({ className, size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none" className={className}>
<path d="M8.84961 2.66998L7.57494 6.54532C7.50971 6.74366 7.39881 6.9239 7.25117 7.07154C7.10353 7.21918 6.92328 7.33008 6.72494 7.39532L2.84961 8.66998L6.72494 9.94465C6.92328 10.0099 7.10353 10.1208 7.25117 10.2684C7.39881 10.4161 7.50971 10.5963 7.57494 10.7947L8.84961 14.67L10.1243 10.7947C10.1895 10.5963 10.3004 10.4161 10.4481 10.2684C10.5957 10.1208 10.7759 10.0099 10.9743 9.94465L14.8496 8.66998L10.9743 7.39532C10.7759 7.33008 10.5957 7.21918 10.4481 7.07154C10.3004 6.9239 10.1895 6.74366 10.1243 6.54532L8.84961 2.66998Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.18359 2.66998V5.33665" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.5156 12.0033V14.67" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.84961 4.0033H5.51628" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.1836 13.3367H14.8503" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
}