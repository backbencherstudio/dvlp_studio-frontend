import ArrowIcon from "@/components/icons/ArrowIcon";
import BookIcon from "@/components/icons/BookIcon";
import Link from "next/link";
import React from "react";

const data = [
  {
    label: "Students Helped",
    value: "30+",
  },
  {
    label: "Expert Tutors",
    value: "5+",
  },
  {
    label: "Success Rate",
    value: "95%",
  },
  {
    label: "Countries Served",
    value: "8+",
  },
];

export default function OurImpact() {
  return (
    <section className="bg-gradient-to-l [background:linear-gradient(90deg,#4F46E5_0%,#9333EA_50%,#DB2777_100%)] relative lg:py-[128px] md:py-25 sm:py-20 py-15 overflow-visible">
      {/* content */}
      <div className="max-w-[1280px] px-8 relative z-10 mx-auto">
        {/* title */}
        <div className="mb-[58px] flex flex-col items-center  ">
          <div className="inline-flex items-center gap-2 bg-white/10 border-white/20 px-6 py-3 rounded-full mb-6.5">
            <span className="w-4 h-4  text-white">
              <BookIcon />
            </span>
            <span className="text-sm font-semibold leading-5 text-white">
              Our Impact
            </span>
          </div>

          <h2 className="max-w-[600px]  text-center text-6xl font-black text-white ">
            Transforming Lives Through Education
          </h2>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 border-white/20 backdrop-blur-[5px] rounded-2xl py-8 flex flex-col items-center justify-center gap-4 text-center text-white"
            >
              <h2 className="text-5xl font-black leading-[48px]">
                {item.value}
              </h2>
              <p className="font-medium leading-6">{item.label}</p>
            </div>
          ))}
        </div>

        {/* button */}
       <div className="flex items-center justify-center mt-16">
       <Link href={"/"}>
          <button className="px-[69px] py-5 rounded-2xl flex items-center justify-center bg-white gap-[19px] cursor-pointer">
            <span className="text-lg font-bold leading-7 text-purple-600">Get in Touch</span>
            <span>
              <ArrowIcon className="text-purple-600" />
            </span>
          </button>
        </Link>
       </div>
      </div>

      {/* blobs */}
      <div className="w-[24vw] h-[24vw] shrink-0 [background:rgba(255,255,255,0.10)] blur-[32px] rounded-full absolute right-20 top-20 " />

      <div className="w-80 h-80 shrink-0 [background:rgba(255,255,255,0.10)] blur-[32px] rounded-full absolute left-20 bottom-20 " />
    </section>
  );
}
