import BookIcon from "@/components/icons/BookIcon";
import { BadgeDollarSign, Clock, ShieldCheck } from "lucide-react";

const featureData = [
  {
    id: "expert-tutors",
    icon: <BookIcon className="text-white w-8 h-8" />,
    title: "Earn teaching hours",
    description: "Easily gain hours and have them automatically tracked",
    gradientStart: "#6366F1",
    gradientEnd: "#A855F7",
  },
  {
    id: "personalized-learning",
    icon: <Clock className="text-white w-8 h-8" />,
    title: "Flexible Scheduling",
    description: "You decide when you work and how you choose",
    gradientStart: "#22C55E",
    gradientEnd: "#10B981",
  },
  {
    id: "flexible-scheduling",
    icon: <BadgeDollarSign className="text-white w-8 h-8" />,
    title: "Control your Pay",
    description: "You decide how much you make with flexibility",
    gradientStart: "#EC4899",
    gradientEnd: "#F43F5E",
  },
  {
    id: "proven-results",
    icon: <ShieldCheck className="text-white w-8 h-8" />,
    title: "Improve Your Resume",
    description: "Gain the in-demand skills employers are looking for.",
   gradientStart: "#FACC15", // bright gold
gradientEnd:   "#EAB308", // deep golden yellow

  },
];

export default function WhyTeach() {
  return (
    <section className="max-w-[1280px] mx-auto py-12 md:py-20 px-4 md:px-0">
      {/* title and info */}
      <div className="mb-[67px]">
        <h2 className="text-4xl font-bold leading-10 text-center mb-[19px]">
          Why Teach with Evolve?
        </h2>
        <p className="text-xl leading-7  max-w-[712.93px] text-center mx-auto">
          We're committed to providing exceptional educational experiences that
          drive real results
        </p>
      </div>

      {/* card section*/}

      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featureData.map((feature) => (
          <div className="flex flex-col items-center justify-center">
            <span
              className="flex w-16 h-16 justify-center items-center shrink-0 rounded-xl mx-auto mb-4 font-arial"
              style={{
                background: `linear-gradient(90deg, ${feature.gradientStart} 0%, ${feature.gradientEnd} 100%)`,
              }}
            >
              {feature.icon}
            </span>

            <h2 className="text-xl font-bold leading-7 mb-[11px] text-[#1E293B]">
              {feature.title}
            </h2>

            <p className=" text-gray-600 text-center  leading-6 w-4/5 md:w-full">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
