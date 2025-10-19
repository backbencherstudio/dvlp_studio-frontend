import ArrowIcon from "@/components/icons/ArrowIcon";
import BookIcon from "@/components/icons/BookIcon";
import Image from "next/image";
import React from "react";

interface SubjectProps {
  id: string | number;
  imageSrc: string;
  icon: React.ElementType;
  tutors: number;
  title: string;
  description: string;
  bgColorFrom: string;
  bgColorTo: string;
}
import {
  CalculatorIcon,
  FlaskConicalIcon,
  BookOpenIcon,
  LanguagesIcon,
  Globe2Icon,
  TargetIcon,
  Icon,
  PenTool,
  PentagonIcon,
} from "lucide-react";

export const subjects: SubjectProps[] = [
  {
    id: 1,
    imageSrc: "/images/Mathematics.png",
    icon: CalculatorIcon,
    tutors: 120,
    title: "Mathematics",
    description: "From basic arithmetic to advanced calculus",
    bgColorFrom: "#3B82F6",
    bgColorTo: "#06B6D4",
  },
  {
    id: 2,
    imageSrc: "/images/Science.png",
    icon: FlaskConicalIcon,
    tutors: 95,
    title: "Science",
    description: "Physics, Chemistry, Biology & more",
    bgColorFrom: "#22C55E",
    bgColorTo: "#16A34A",
  },
  {
    id: 3,
    imageSrc: "/images/English.png",
    icon: PenTool,
    tutors: 85,
    title: "English",
    description: "Literature, Writing & Communication",
    bgColorFrom: "#8B5CF6",
    bgColorTo: "#7C3AED",
  },
  {
    id: 4,
    imageSrc: "/images/Languages.png",
    icon: LanguagesIcon,
    tutors: 70,
    title: "Languages",
    description: "Spanish, French, German & more",
    bgColorFrom: "#EC4899",
    bgColorTo: "#DB2777",
  },
  {
    id: 5,
    imageSrc: "/images/Social-Studies.png",
    icon: Globe2Icon,
    tutors: 60,
    title: "Social Studies",
    description: "History, Geography & Government",
    bgColorFrom: "#F97316",
    bgColorTo: "#EA580C",
  },
  {
    id: 6,
    imageSrc: "/images/Test-Prep.png",
    icon: TargetIcon,
    tutors: 110,
    title: "Test Prep",
    description: "SAT, ACT, AP & College Prep",
    bgColorFrom: "#EC4899",
    bgColorTo: "#DB2777",
  },
];

export default function SubjectMastery() {
  return (
    <section className="py-14 md:py-[128px]">
      {/* title */}
      <div>
        <div className="flex items-center justify-center mb-3">
          <div className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[#DBEAFE] to-[#CFFAFE] px-6 py-3 rounded-full">
            <span>
              <BookIcon className="text-[#2563EB] w-4 h-4" />
            </span>
            <span className="text-[#1E40AF] text-center font-arial text-sm font-bold leading-5">
              Suject Mastery
            </span>
          </div>
        </div>

        <h2 className=" max-w-[729.34px] mx-auto flex flex-col justify-center items-center text-center md:text-6xl text-4xl font-black leading-tight text-[#1E293B] mb-[15px]">
          Master Any Subject{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#0891B2]">
            With Expert Guidance
          </span>
        </h2>
      </div>
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-x-[115px] gap-y-8 gap max-w-[1378px] mx-auto px-8 mt-8 md:mt-[84px]">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} {...subject} />
        ))}
      </div>

      {/* button */}
      <div className="mt-16">
        <button className="flex items-center gap-[7.67px] [background:linear-gradient(90deg,#3B82F6_0%,#06B6D4_100%)] pl-8 pr-[32.011px] py-4 rounded-2xl mx-auto cursor-pointer hover:shadow">
          <span className="text-white text-center font-bold leading-6">
            Explore All Sujects
          </span>
          <span>
            <ArrowIcon className="text-white" />
          </span>
        </button>
      </div>
    </section>
  );
}

const SubjectCard = ({
  id,
  imageSrc,
  title,
  description,
  icon: Icon,
  tutors,
  bgColorFrom,
  bgColorTo,
}: SubjectProps) => {
  return (
    <div className="rounded-3xl border border-gray-100  md:w-96">
      {/* img */}
      <div className="w-full md:h-48 rounded-t-3xl overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover "
          width={600}
          height={300}
        />

        <div className="shrink-0 [background:linear-gradient(0deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.00)_100%)] absolute inset-0 rounded-t-3xl" />

        <div className="absolute z-10 inset-0  flex flex-col justify-between p-4">
          <div
            className={`flex w-12 h-12 justify-center items-center shrink-0 bg-gradient-to-r p-2 rounded-xl text-white`}
            style={{
              backgroundImage: `linear-gradient(to right, ${bgColorFrom}, ${bgColorTo})`,
            }}
          >
            <Icon />
          </div>
          <span className="text-sm font-bold leading-5 opacity-90 text-white">
            {tutors}+ tutors
          </span>
        </div>
      </div>

      {/* info */}
      <div className="p-[25px] font-arial">
        <h5 className="text-2xl text-slate-800 font-bold leading-8 mb-3">
          {title}
        </h5>
        <p className="mb-4 text-lg text-gray-600 leading-6 text-nowrap">
          {description}
        </p>

        <p className="flex justify-between items-center">
          <span className="text-[#003466] font-bold leading-6">
            Explore Tutors
          </span>
          <span>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 11L6.5 6L1.5 1"
                stroke="#9CA3AF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </p>
      </div>
    </div>
  );
};
