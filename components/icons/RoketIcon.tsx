import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function RoketIcon({ className, size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none" className={className}>
<path d="M3.97982 11.0002C2.97982 11.8402 2.64648 14.3335 2.64648 14.3335C2.64648 14.3335 5.13982 14.0002 5.97982 13.0002C6.45315 12.4402 6.44648 11.5802 5.91982 11.0602C5.66069 10.8129 5.31935 10.67 4.9613 10.6589C4.60326 10.6478 4.25374 10.7694 3.97982 11.0002Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.98047 9.99984L6.98047 7.99984C7.33523 7.07946 7.78194 6.19722 8.3138 5.36651C9.09059 4.1245 10.1722 3.10187 11.4558 2.3959C12.7394 1.68993 14.1822 1.32409 15.6471 1.33317C15.6471 3.14651 15.1271 6.33317 11.6471 8.66651C10.8051 9.19899 9.9117 9.64567 8.98047 9.99984Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.97982 7.99985H3.64648C3.64648 7.99985 4.01315 5.97985 4.97982 5.33318C6.05982 4.61318 8.31315 5.33318 8.31315 5.33318" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.98047 9.99984V13.3332C8.98047 13.3332 11.0005 12.9665 11.6471 11.9998C12.3671 10.9198 11.6471 8.6665 11.6471 8.6665" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
}