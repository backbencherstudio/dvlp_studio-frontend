import React from "react";

interface IconProps {
  className?: string;
  size?: number | string;
}

export default function EmailIcon({ className, size = 24 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className={className}>
<path d="M17.3367 4.00342H4.00334C3.08286 4.00342 2.33667 4.74961 2.33667 5.67008V15.6701C2.33667 16.5906 3.08286 17.3368 4.00334 17.3368H17.3367C18.2571 17.3368 19.0033 16.5906 19.0033 15.6701V5.67008C19.0033 4.74961 18.2571 4.00342 17.3367 4.00342Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19.0033 6.50342L11.5283 11.2534C11.2711 11.4146 10.9736 11.5001 10.67 11.5001C10.3664 11.5001 10.0689 11.4146 9.81167 11.2534L2.33667 6.50342" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
}