import SparkIcon from "@/components/icons/SparkIcon";
import React from "react";

export default function AboutHero() {
  return (
    <section className="lg:pt-56 md:pt-40 pt-36  lg:pb-25 md:pb-18 pb-12 shrink-0 [background:linear-gradient(135deg,rgba(49,46,129)_0%,rgba(88,28,135)_50%,rgba(131,24,67)_100%)] relative">

      {/* content */}
      <div className="flex flex-col items-center justify-center relative z-20">
        <div className="mb-[21.34px] [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] px-[24.66px] py-[12.67px] rounded-full border-solid border-[rgba(255,255,255,0.20)] flex gap-2 items-center ">
          <span className="text-[#FACC15]">
            <SparkIcon />
          </span>
          <span className="text-sm font-medium leading-5 text-white">Our Story</span>
        </div>

        <h1 className="mt-4 text-4xl shrink-0 text-white text-center font-black lg:leading-[96px] md:leading-[60px]  leading-12 lg:text-8xl mb-1.5  sm:text-3xl md:text-5xl ">
         <span className=""> Transforming Education,</span>
          <br />
          <span className="bg-gradient-to-r from-[#FACC15] via-[#F472B6] to-[#60A5FA] bg-clip-text text-transparent">
            One Student at a Time
          </span>
        </h1>
        <p className="text-xl font-normal leading-8 max-w-[854.84px] text-gray-300 text-center sm:text-lg md:text-2xl">
          Since 2019, we've been on a mission to make quality education
          accessible, personalized, and effective for students of all ages and
          backgrounds.
        </p>
      </div>

      {/* blob 1 */}
      <div className="w-[40vw] h-[40vw] sm:w-[25vw] sm:h-[25vw] lg:w-[20vw] lg:h-[20vw] shrink-0 bg-[rgba(59,130,246,0.20)] blur-[32px] rounded-full absolute left-[10vw] top-[10vw] sm:left-[75px] sm:top-[78px] z-0"></div>

      {/* blob 2 */}
      <div className="w-[35vw] h-[35vw] sm:w-[20vw] sm:h-[20vw] lg:w-[20vw] lg:h-[20vw] shrink-0 bg-[rgba(168,85,247,0.20)] blur-[32px] rounded-full absolute bottom-10 right-10 sm:bottom-20 sm:right-10 z-0"></div>

    </section>
  );
}
