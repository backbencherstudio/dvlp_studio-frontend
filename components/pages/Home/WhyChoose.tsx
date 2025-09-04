import ArrowIcon from "@/components/icons/ArrowIcon";
import LightIcon from "@/components/icons/LightIcon";
import Image from "next/image";
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

const features: FeatureProps[] = [
  {
    title: "AI-Powered Matching",
    description:
      "Our intelligent system pairs you with the perfect tutor based on your learning style and goals.",
    imageSrc:
      "https://img.freepik.com/free-photo/engineer-wearing-vr-headset-data-center-installing-software_482257-116005.jpg?semt=ais_incoming&w=740&q=80",
    link: "#",
  },
  {
    title: "Flexible Scheduling",
    description:
      "Book sessions that fit your schedule and start learning sessions instantly with our on-demand tutoring platform.",
    imageSrc:
      "https://img.freepik.com/free-photo/smiling-young-blonde-female-teacher-wearing-glasses-sitting-desk-with-school-supplies-classroom-holding-open-book-looking-front_141793-119722.jpg?semt=ais_incoming&w=740&q=80",
    link: "#",
  },
  {
    title: "Verified Excellence",
    description:
      "All tutors undergo rigorous screening and continuous performance monitoring.",
    imageSrc:
      "https://img.freepik.com/free-photo/group-three-young-good-looking-startupers-sitting-light-coworking-space-talking-about-future-project-looking-through-design-examples-digital-tablet-friends-smiling-talking-about-work_176420-8284.jpg?semt=ais_incoming&w=740&q=80",
    link: "#",
  },
  {
    title: "Unlimited Support",
    description:
      "24/7 access to resources, practice materials, and academic support whenever you need it.",
    imageSrc:
      "https://img.freepik.com/premium-photo/seven-business-people-holding-white-cards-with-letters-assemble-word-support-textured-wooden-desk-conceptual-teamwork-cooperation-customer-service_254268-3314.jpg?semt=ais_incoming&w=740&q=80",
    link: "#",
  },
];

export default function WhyChoose() {
  return (
    <section className="[background:linear-gradient(135deg,#F8FAFC_0%,#EFF6FF_100%)]  py-14 md:py-[128px] relative">
      {/* main content */}
      <div>
        {/* title */}
        <div>
          <div className="flex items-center justify-center mb-3">
            <div className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[#F3E8FF] to-[#FCE7F3] px-6 py-3 rounded-full">
              <span>
                <LightIcon className="text-[#003466]" />
              </span>
              <span className="text-purple-800 text-center font-arial text-sm font-bold leading-5">
                Why Choose Evolve
              </span>
            </div>
          </div>

          <h2 className=" max-w-[729.34px] mx-auto flex flex-col justify-center items-center text-center text-6xl font-black leading-tight text-[#1E293B] mb-[15px]">
            The Future of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#DB2777]">
              Personalized Learning
            </span>
          </h2>

          <p className="flex max-w-[745.26px] h-[50px] flex-col justify-center shrink-0 text-[#4B5563] text-center font-arial text-xl font-normal leading-7 mx-auto">
            We're not just another tutoring platform. We're revolutionizing
            education with cutting- edge technology and human expertise.
          </p>
        </div>

        {/* blogs cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1280px] mx-auto px-8 mt-8 md:mt-[84px]">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              link={feature.link}
            />
          ))}
        </div>
      </div>

      {/* blog circle */}
      <div className="w-[16.2vw] h-[16.2vw] shrink-0 [background:rgba(191,219,254,0.30)] blur-[32px] rounded-full absolute right-20 top-20"></div>
      <div className="w-[20.25vw] h-[20.25vw] shrink-0 [background:rgba(233,213,255,0.30)] blur-[32px] rounded-full absolute left-20 bottom-20"></div>
    </section>
  );
}

const FeatureCard: React.FC<FeatureProps> = ({
  title,
  description,
  imageSrc,
  link,
}) => {
  return (
    <div className="max-w-[584px]  shrink-0 border [background:rgba(255,255,255,0.80)] backdrop-blur-[2px] rounded-3xl border-solid border-[rgba(255,255,255,0.50)] hover:shadow-xl transition-all duration-300">
      <div className="w-full md:h-64 rounded-t-3xl overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover "
          width={600}
          height={300}
        />
        <div className="shrink-0 [background:linear-gradient(0deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.00)_100%)] absolute inset-0 rounded-t-3xl" />
      </div>
      <div className="p-8 font-arial">
        <h3 className=" mb-5 text-2xl font-bold leading-8 text-[#1E293B]">
          {title}
        </h3>
        <p className=" text-lg font-normal leading-[29.25px] mb-[30px] text-[#4B5563]">
          {description}
        </p>
        <a
          href={link}
          className="text-base text-[#003466] hover:text-blue-950 font-bold leading-6 flex items-center  gap-2 group"
        >
          Learn more{" "}
          <span>
            <ArrowIcon className=" -rotate-45 group-hover:rotate-0 transition-transform duration-200" />
          </span>
        </a>
      </div>
    </div>
  );
};
