import SearchIcon from "@/components/icons/SearchIcon";
import SparkIcon from "@/components/icons/SparkIcon";
import React from "react";

export default function FindTutorHero({ search, setSearch }: any) {
  return (
    <section className="lg:pt-56 md:pt-40 pt-36  lg:pb-30 md:pb-20 pb-12 shrink-0 [background:linear-gradient(135deg,rgba(49,46,129)_0%,rgba(88,28,135)_50%,rgba(131,24,67)_100%)] relative">
      {/* content */}
      <div className="flex flex-col items-center justify-center relative z-20">
        <div className="mb-[21.34px] [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] px-[24.66px] py-[12.67px] rounded-full border-solid border-[rgba(255,255,255,0.20)] flex gap-2 items-center ">
          <span className="text-[#FACC15]">
            <SparkIcon />
          </span>
          <span className="text-sm font-medium leading-5 text-white">
            Our Story
          </span>
        </div>

        <h1 className="mt-4 text-4xl shrink-0 text-white text-center font-black lg:leading-[96px] md:leading-[60px]  leading-12 lg:text-8xl mb-1.5  sm:text-3xl md:text-5xl ">
          <span className=""> Find Your Perfect</span>
          <br />
          <span className="bg-gradient-to-r from-[#FACC15] via-[#F472B6] to-[#60A5FA] bg-clip-text text-transparent">
            Learning Partner
          </span>
        </h1>
        <p className="text-xl font-normal leading-8 max-w-[854.84px] text-gray-300 text-center sm:text-lg md:text-2xl mb-8 mt-4">
          Browse our directory of qualified tutors and discover the perfect
          match for your learning style and goals.
        </p>

        {/* search input */}
        <div className="relative ">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex lg:min-w-[672px] justify-center items-start gap-[8.34px] border bg-white/10 backdrop-blur-[5px] pl-[58.33px] pr-[24.33px] py-[22.34px]  rounded-2xl border-solid border-white/20 text-lg text-white placeholder:text-gray-300 focus:ring-0 focus:outline-0 "
            placeholder="Search by name, subject, or keyword..."
          />
          <SearchIcon className=" absolute left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-6 h-6 " />
        </div>
      </div>

      {/* blob 1 */}
      <div className="w-[40vw] h-[40vw] sm:w-[25vw] sm:h-[25vw] lg:w-[20vw] lg:h-[20vw] shrink-0 bg-[rgba(59,130,246,0.20)] blur-[32px] rounded-full absolute left-[10vw] top-[10vw] sm:left-[75px] sm:top-[78px] z-0"></div>

      {/* blob 2 */}
      <div className="w-[35vw] h-[35vw] sm:w-[20vw] sm:h-[20vw] lg:w-[20vw] lg:h-[20vw] shrink-0 bg-[rgba(168,85,247,0.20)] blur-[32px] rounded-full absolute bottom-10 right-10 sm:bottom-20 sm:right-10 z-0"></div>
    </section>
  );
}
