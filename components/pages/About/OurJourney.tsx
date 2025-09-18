import BookIcon from "@/components/icons/BookIcon";
import React from "react";

export default function OurJourney() {
  return (
    <section className="lg:py-[128px] md:py-25 sm:py-20 py-15">
      {/* title */}
      <div className="mb-[74px]  space-y-[17.33px] flex flex-col items-center  ">
        <div className="inline-flex items-center gap-2 [background:linear-gradient(90deg,#DBEAFE_0%,#CFFAFE_100%)] px-6 py-3 rounded-full">
          <span className="w-4 h-4 text-[#2563EB]">
            <BookIcon />
          </span>
          <span className="text-sm font-semibold leading-5 text-[#1E40AF]">Our Journey</span>
        </div>

        <h2 className="max-w-[598.213px] text-center text-[40px] md:text-6xl font-black text-[#1E293B]">
          <span>Key Milestones in </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#0891B2]">
            Our Mission
          </span>
        </h2>
      </div>

      {/* Timeline */}
      <Timeline />
    </section>
  );
}

const milestones = [
  {
    year: 2020,
    title: "Founded",
    description:
      "Started with a vision to make quality education accessible to everyone",
    side: "left",
  },
  {
    year: 2021,
    title: "First 1000 Students",
    description:
      "Reached our first milestone of helping 1000 students achieve their goals",
    side: "right",
  },
  {
    year: 2022,
    title: "Global Expansion",
    description: "Expanded to serve students in over 50 countries worldwide",
    side: "left",
  },
  {
    year: 2023,
    title: "AI Integration",
    description:
      "Launched AI-powered matching system for personalized learning",
    side: "right",
  },
  {
    year: 2024,
    title: "25K+ Success Stories",
    description:
      "Celebrated over 25,000 students who transformed their academic performance",
    side: "left",
  },
];

const Timeline = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[1280px] px-8 ">
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 shrink-0 [background:linear-gradient(180deg,#C7D2FE_0%,#E9D5FF_50%,#C7D2FE_100%)] transform -translate-x-1/2 " />
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`flex ${
                milestone.side === "left" ? "flex-row" : "flex-row-reverse"
              } items-center mb-16 relative`}
            >
              {/* indicator */}
              <div
                className={`absolute left-1/2 w-6 h-6 shrink-0 [background:linear-gradient(90deg,#6366F1_0%,#A855F7_100%)] shadow-lg rounded-full border-4 border-white transform -translate-x-1/2 z-10 lg:bottom-auto  -bottom-11 ${
                  index === 4 && "hidden md:block"
                }`}
              />

              {/* Content box */}
              <div
                className={`lg:w-[567px] p-8 bg-white border-gray-300 shadow-sm backdrop-blur-[2px] rounded-2xl ${
                  milestone.side === "right" ? "mr-0 text-left" : "text-right"
                }`}
              >
                <p className="text-xl font-bold text-[#6366F1] mb-3">
                  {milestone.year}
                </p>
                <h3 className="text-2xl font-bold text-[#1E293B] mb-[15.33px]">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-[#4B5563] leading-[26px]">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
