import BookIcon from "@/components/icons/BookIcon";

const featureData = [
  {
    id: "expert-tutors",
    icon: <BookIcon className="text-white w-8 h-8" />,
    title: "Expert Tutors",
    description:
      "Qualified educators with proven track records in their subjects",
    gradientStart: "#6366F1",
    gradientEnd: "#A855F7",
  },
  {
    id: "personalized-learning",
    icon: <BookIcon className="text-white w-8 h-8" />,
    title: "Personalized Learning",
    description:
      "Customized lesson plans tailored to each student's unique needs",
    gradientStart: "#22C55E",
    gradientEnd: "#10B981",
  },
  {
    id: "flexible-scheduling",
    icon: <BookIcon className="text-white w-8 h-8" />,
    title: "Flexible Scheduling",
    description: "Book sessions that fit your schedule, online or in-person",
    gradientStart: "#EC4899",
    gradientEnd: "#F43F5E",
  },
  {
    id: "proven-results",
    icon: <BookIcon className="text-white w-8 h-8" />,
    title: "Proven Results",
    description: "Track record of improved grades and student confidence",
    gradientStart: "#A855F7",
    gradientEnd: "#8B5CF6",
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
