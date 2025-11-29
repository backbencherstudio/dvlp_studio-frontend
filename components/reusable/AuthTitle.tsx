import React from "react";

interface AuthTitleProps {
  title: string;
  subTitle?: string;
  className?: string;
  isDarkMode?: boolean;  // Optional prop to switch between light and dark modes
}

export default function AuthTitle({
  title,
  subTitle,
  className = "",
  isDarkMode = true, 
}: AuthTitleProps) {
  return (
    <div className="mx-auto text-center">
      <h3
        className={[
          "text-center text-2xl md:text-4xl font-black leading-10 md:mb-4",
          // Dark mode styles
          isDarkMode
            ? "text-white"
            : "text-slate-800", // Light mode title text color
          className,
        ].join(" ")}
      >
        {title}
      </h3>
      <p
        className={[
          "flex flex-col justify-center shrink-0 text-center text-sm md:text-xl font-normal leading-7 text-nowrap",
          // Dark mode styles
          isDarkMode
            ? "text-gray-300"
            : "text-gray-700", // Light mode subtitle text color
          className,
        ].join(" ")}
      >
        {subTitle}
      </p>
    </div>
  );
}
