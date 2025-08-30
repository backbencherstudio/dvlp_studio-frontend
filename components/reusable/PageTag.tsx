import React from "react";

interface TagProps {
  icon: React.ReactNode;
  title: string;
}

const PageTag = ({ icon, title }: TagProps) => {
  return (
    <div className="mx-auto">
      <div className=" inline-flex  justify-center items-center gap-2 border [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] px-[24.66px] py-[12.66px]  rounded-full border-solid border-[rgba(255,255,255,0.20)] mb-4 md:mb-6 mx-auto text-white">
        {icon} <span>{title}</span>
      </div>
    </div>
  );
};

export default PageTag;
