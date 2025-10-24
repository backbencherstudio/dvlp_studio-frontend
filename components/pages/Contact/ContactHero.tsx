import ArrowIcon from "@/components/icons/ArrowIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import SparkIcon from "@/components/icons/SparkIcon";
import Link from "next/link";

import React from "react";
import { useForm } from "react-hook-form";

export default function ContactHero() {

    

  return (
    <section className="lg:pt-56 md:pt-40 pt-36  lg:pb-30 md:pb-20 pb-12 shrink-0 [background:linear-gradient(135deg,rgba(49,46,129)_0%,rgba(88,28,135)_50%,rgba(131,24,67)_100%)] relative">
      {/* content */}
      <div className="flex flex-col items-center justify-center relative z-20">
        <div className="mb-[21.34px] [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] px-[24.66px] py-[12.67px] rounded-full border-solid border-[rgba(255,255,255,0.20)] flex gap-2 items-center ">
          <span className="text-[#FACC15]">
            <SparkIcon />
          </span>
          <span className="text-sm font-medium leading-5 text-white">
            Get in Touch
          </span>
        </div>

        <h1 className="mt-4 text-[40px] shrink-0 text-white text-center font-black lg:leading-[96px] md:leading-[60px]  leading-12 lg:text-8xl mb-1.5  sm:text-[40px] md:text-5xl ">
          <span className=""> Let's Start Your </span>
          <br />
          <span className="bg-gradient-to-r from-[#FACC15] via-[#F472B6] to-[#60A5FA] bg-clip-text text-transparent">
            Learning Journey
          </span>
        </h1>
        <p className=" font-normal leading-8 max-w-[854.84px] text-gray-300 text-center sm:text-lg md:text-2xl mb-8 mt-4 px-4 md:px-0">
          Have questions about our tutoring services? Ready to get started?
          We're here to help you on your learning journey.
        </p>

        {/*  CTA buttons */}
        <div className=" flex flex-col md:flex-row-reverse items-center justify-center gap-4 ">
          <Link href="#send-message">
            <button className="px-[40px] py-5 shrink-0 bg-gradient-to-r from-[#6366F1] to-[#A855F7] flex rounded-2xl gap-3 items-center text-lg font-bold text-white w-[260px] justify-center">
              <span>Send Message</span>
              <span>
                <ArrowIcon className="h-5 w-5" />
              </span>
            </button>
          </Link>

          <Link href="#faq">
            <button className="py-5 px-[30px] flex rounded-2xl gap-3 border border-[rgba(255,255,255,0.20)] items-center text-lg font-bold bg-white/10 text-white w-[260px] justify-center">
              <span> View FAQ</span>
              <span>
                <ArrowIcon className="h-5 w-5" />
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* blob 1 */}
      <div className="w-[40vw] h-[40vw] sm:w-[25vw] sm:h-[25vw] lg:w-[20vw] lg:h-[20vw] shrink-0 bg-[rgba(59,130,246,0.20)] blur-[32px] rounded-full absolute left-[10vw] top-[10vw] sm:left-[75px] sm:top-[78px] z-0"></div>

      {/* blob 2 */}
      <div className="w-[35vw] h-[35vw] sm:w-[20vw] sm:h-[20vw] lg:w-[20vw] lg:h-[20vw] shrink-0 bg-[rgba(168,85,247,0.20)] blur-[32px] rounded-full absolute bottom-10 right-10 sm:bottom-20 sm:right-10 z-0"></div>
    </section>
  );
}
