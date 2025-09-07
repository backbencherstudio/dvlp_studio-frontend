import { Laptop, Monitor, Tablet, Smartphone } from "lucide-react";
import React from "react";
const deviceFeatures = [
  {
    id: 1,
    icon: <Monitor />, // Icon to represent Desktop
    title: "Desktop Learning",
    description: "Full-featured experience on your computer.",
  },
  {
    id: 2,
    icon: <Tablet />, // Icon to represent Tablet
    title: "Tablet Ready",
    description: "Touch-optimized for iPad and tablets.",
  },
  {
    id: 3,
    icon: <Smartphone />, // Icon to represent Mobile
    title: "Mobile First",
    description: "Learn anywhere with our mobile app.",
  },

  {
    id: 4,
    icon: <Laptop />,
    title: "Laptop Support",
    description: "Seamless experience on laptop devices.",
  },
];

export default function LearnAnywhere() {
  return (
    <section className="[background:linear-gradient(90deg,#111827_0%,#1E293B_100%)] px-[197px] py-20 font-arial">
      <div className=" max-w-[1524px] mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <h3 className="text-4xl font-bold leading-10 text-white mb-4">
            Learn Anywhere, Anytime
          </h3>
          <p className="text-xl font-normal leading-7 text-[#D1D5DB]">
            Our platform works seamlessly across all your devices
          </p>
        </div>

        {/*  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {deviceFeatures.map((device) => (
            <div className=" [background:rgba(255,255,255,0.10)] backdrop-blur-[2px] rounded-2xl py-8 px-6 flex flex-col items-center justify-center ">
              <span className="p-4 inline-flex items-center justify-center mb-6 [background:linear-gradient(90deg,#003466_0%,#1271CD_100%)] mx-auto rounded-xl text-white">
                {device.icon}
              </span>
              <h3 className="text-xl font-bold leading-7 mb-3 text-white text-center">
                {device.title}
              </h3>
              <p className="text-gray-300 text-center  font-normal leading-6 text-base ">
                {device.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
