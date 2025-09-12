import ArrowIcon from "@/components/icons/ArrowIcon";
import BookIcon from "@/components/icons/BookIcon";
import CurosrIcon from "@/components/icons/CursorIcon";
import RoketIcon from "@/components/icons/RoketIcon";
import StackIcon from "@/components/icons/StackIcon";
import Link from "next/link";

const ReadyToTransform = () => {
  return (
    <section className=" md:max-h-[713px] shrink-0 bg-gradient-to-r from-[#C55528]  via-[#DB2777] to-[#9333EA] relative pt-[128px] pb-[138px]">
      {/* content */}
      <div className="flex items-center justify-center ">
        {/* heading */}
        <div>
          <div className="flex items-center justify-center mb-3">
            <div className="inline-flex justify-center items-center gap-2  px-6 py-3 rounded-full bg-white/20 backdrop-blur-[2px] border border-white/30">
              <RoketIcon className="text-white w-4 h-4" />
              <span className="text-[#FFFFFF] text-center  text-sm font-bold leading-5">
                Ready To Transform
              </span>
            </div>
          </div>

          <h2 className="max-w-[770.56px] mx-auto  text-center text-5xl md:text-7xl font-black leading-tight text-white mb-[20px]">
            Your Success Story Starts Today
          </h2>

          <p className="max-w-[770.2px] font-arial mx-auto text-2xl text-center font-normal leading-8 text-white">
            Join thousands of students who've already transformed their academic
            journey. Your perfect tutor is just one click away.
          </p>

          <div className="flex items-center justify-center gap-5 mt-[51px] px-4 md:px-0">
            <Link href={"/"}>
              <button className="flex md:gap-3 items-center py-4 md:py-[21px] px-5 md:px-[40px] bg-white text-[#003466] text-lg leading-7 rounded-2xl">
                <span>
                  <CurosrIcon />
                </span>
                <span className="text-lg font-bold leading-7">Find Your Tutor Now</span>
                <span>
                  <ArrowIcon />
                </span>
              </button>
            </Link>
            <Link href={"/"}>
              <button className="flex gap-3 items-center py-4 md:py-[21px] px-5 md:px-[40px] text-white text-lg leading-7 rounded-2xl bg-white/20 border border-white/30 ">
                <span>
                  <StackIcon className="w-5 h-5" />
                </span>
                
                <span className="text-lg font-bold leading-7">Find Your Tutor Now</span>
              
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* blob */}
      <div className="w-[20vw] h-[20vw] shrink-0 bg-[rgba(255,255,255,0.10)] blur-[32px] rounded-full absolute left-20 bottom-4.5"></div>
      <div className="w-[25vw] h-[25vw] shrink-0 bg-[rgba(255,255,255,0.10)] blur-[32px] rounded-full absolute top-20 right-20 "></div>
    </section>
  );
};

export default ReadyToTransform;
