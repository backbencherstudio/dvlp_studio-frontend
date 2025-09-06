import React from "react";

export default function OurJourney() {
  return (
    <div>
      <Timeline />
    </div>
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
    <div className="flex flex-col items-center py-12">
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
