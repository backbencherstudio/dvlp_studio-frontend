import React from "react";

interface AuthTitleProps {
  title: string;
  subTitle: string;
  className?: string;
}

export default function AuthTitle({ title, subTitle, className }: AuthTitleProps) {
  return (
    <div className="mx-auto text-center">
      <h3 className="text-white text-center  text-2xl md:text-4xl font-black leading-10 md:mb-4 text-nowrap ">
        {title}
      </h3>
      <p className="flex  flex-col justify-center shrink-0 text-gray-300 text-center text-sm  md:text-xl font-normal leading-7 text-nowrap ">
        {subTitle}
      </p>
    </div>
  );
}
