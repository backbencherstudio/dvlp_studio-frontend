import BookIcon from "@/components/icons/BookIcon";
import React from "react";

type ValueProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientStart: string;
  gradientEnd: string;
};

const valuesList = [
  {
    title: "accountability",
    description: "We strive for the highest standards in everything we do",
    icon: <BookIcon />,
    gradientStart: "#6366F1",
    gradientEnd: "#A855F7",
  },
  {
    title: "kindness",
    description: "We care deeply about each student's journey and success",
    icon: <BookIcon />,
    gradientStart: "#EC4899",
    gradientEnd: "#F43F5E",
  },
  {
    title: "perseverance",
    description: "Building connections between students, tutors, and families",
    icon: <BookIcon className="w-8 h-8" />,
    gradientStart: "#3B82F6",
    gradientEnd: "#06B6D4",
  },
  {
    title: "patience",
    description: "Continuously evolving our methods to enhance learning",
    icon: <BookIcon />,
    gradientStart: "#22C55E",
    gradientEnd: "#10B981",
  },
];

export default function OurValue() {
  return (
    <section className="lg:py-[128px] md:py-25 sm:py-20 py-15 bg-gradient-to-r from-[#F8FAFC] to-[#EFF6FF] relative">
      <div className="relative z-10">
        {/* title */}
        <div className="mb-[74px]  space-y-[17.33px] flex flex-col items-center  ">
          <div className="inline-flex items-center gap-2 [background:linear-gradient(90deg,#DBEAFE_0%,#CFFAFE_100%)] px-6 py-3 rounded-full">
            <span className="w-4 h-4  text-[#9333EA]">
              <BookIcon />
            </span>
            <span className="text-sm font-semibold leading-5 text-[#6B21A8]">
              Our Value
            </span>
          </div>

          <h2 className="max-w-[740px] text-center text-[40px] md:text-6xl font-black text-[#1E293B] ">
            <span>The Principles That </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#0891B2]">
              Guide Everything We Do
            </span>
          </h2>
          <p className="text-gray-700 text-lg font-normal leading-[29.25px] text-center">
            Above all, we believe our actions show our true values.
          </p>
        </div>

        {/* */}
        <div className="max-w-[1216px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuesList.map((value, idx) => (
            <div className="px-9 pb-9 pt-8 bg-white/80 backdrop-blur-[2px] rounded-3xl border border-white/50">
              <span
                className="flex w-16 h-16 justify-center items-center shrink-0 rounded-xl mx-auto mb-6 text-white"
                style={{
                  background: `linear-gradient(90deg, ${value.gradientStart} 0%, ${value.gradientEnd} 100%)`,
                }}
              >
                {value.icon}
              </span>

              <h4 className="text-slate-800 text-center  text-xl font-bold leading-7 capitalize mb-[19px]">
                {value.title}
              </h4>
              <p className="text-gray-600 text-center leading-[26px]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* blobs */}
      <div className="w-80 h-80 shrink-0 [background:rgba(233,213,255,0.30)] blur-[32px] rounded-full absolute bottom-20 left-20" />
      <div className="w-64 h-64 shrink-0 [background:rgba(191,219,254,0.30)] blur-[32px] rounded-full absolute top-20 right-20" />
    </section>
  );
}
