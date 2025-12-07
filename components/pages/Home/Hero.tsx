import ArrowIcon from "@/components/icons/ArrowIcon";
import Link from "next/link";

// components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-24 pb-20 text-center max-h-[1372px]">
      {/* Gradient + glows (only inside Hero) */}
      <div
        className="
            absolute inset-0 -z-10
            shrink-0 bg-gradient-to-br from-[#2e026d] via-[#4b1d8b] to-[#0f172a]
          "
        // Soft fade at bottom so gradient doesn't bleed into next sections
        //   style={{
        //     maskImage: "linear-gradient(to bottom, black 70%, transparent)",
        //     WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent)",
        //   }}
      >
        {/* soft blobs */}
        {/* <div className="absolute left-8 top-24 h-72 w-72 rounded-full bg-fuchsia-400/40 blur-[140px]" /> */}
        {/* <div className="absolute right-10 bottom-10 h-[420px] w-[420px] rounded-full bg-red-500 blur-[200px]" /> */}

        <div className="w-[15vw] h-[15vw] shrink-0 [background:rgba(0,52,102,0.20)] blur-[32px] rounded-full absolute left-10 top-20" />

        <div className="w-[41.25vw] h-[41.25vw] shrink-0 [background:linear-gradient(90deg,rgba(168,85,247,0.10)_0%,rgba(59,130,246,0.10)_100%)] blur-[32px] rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0" />

        <div className="w-[20vw] h-[20vw] shrink-0 [background:rgba(59,130,246,0.20)] blur-[32px] rounded-full absolute right-10 bottom-0 " />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 text-center text-white">
        <h1 className="mt-4 text-[42px] md:text-6xl shrink-0 text-white text-center font-black leading-[50px] md:leading-[96px] lg:text-8xl  mb-1.5 ">
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-orange-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Learning Journey
          </span>
        </h1>

        <p className="flex max-w-[830.52px] mx-auto flex-col justify-center shrink-0 text-gray-300 text-center [font-family:Arial] md:text-lg lg:text-2xl font-normal md:leading-8 mt-3.5">
          Connect with world-class tutors who don't just teach—they inspire.
          Experience personalized learning that adapts to your unique style and
          accelerates your success.
        </p>

        {/*  CTA buttons */}
        <div className=" flex flex-col md:flex-row items-center justify-center gap-4 mt-[38px]">
          <span>
            <Link href={"/find-tutors"} className=" px-[46px] py-5 shrink-0 [background:linear-gradient(90deg,#A855F7_0%,#EC4899_100%)] flex rounded-2xl gap-[19px] items-center text-lg font-bold hover:scale-105 transition-transform duration-300">
              <span>Find a Tutor</span>
              <span>
                <ArrowIcon className="h-5 w-5" />
              </span>
            </Link>
          </span>

          <Link href="/tutor/sign-up">
            <button className="py-5 px-[30px] cursor-pointer flex rounded-2xl gap-[19px] borde r border-[rgba(255,255,255,0.15)] items-center text-lg font-bold hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-cyan-600 to-blue-700">
              <span> Become a Tutor</span>
              <span>
                <ArrowIcon className="h-5 w-5" />
              </span>
            </button>
          </Link>
        </div>

        {/* video */}
        <div className="relative mt-14 max-w-[1056px] h-auto md:h-[608px] mx-auto z-10">
          {/* Blurred Gradient Background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-md" />

          {/* Video wrapper */}
          <div className="relative z-20 p-[17px]">
            <div className="flex justify-center ">
              <iframe
                className="rounded-2xl shadow-lg w-full  aspect-video"
                src="https://www.youtube.com/embed/AvqQVYiEIlA?si=WMyL4Q4l7QnSqI9h"
                title="Learning Journey Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
