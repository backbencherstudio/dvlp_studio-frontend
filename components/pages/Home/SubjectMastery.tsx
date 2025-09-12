import ArrowIcon from "@/components/icons/ArrowIcon";
import BookIcon from "@/components/icons/BookIcon";
import LightIcon from "@/components/icons/LightIcon";
import Image from "next/image";
import React from "react";

interface SubjectProps {
  id: string | number;
  imageSrc: string;
  title: string;
  description: string;
}

const subjects: SubjectProps[] = [
  {
    id: 120,
    imageSrc: "https://via.placeholder.com/400x300",
    title: "Mathematics",
    description: "From basic arithmetic to advanced calculus",
  },
  {
    id: 95,
    imageSrc: "https://via.placeholder.com/400x300",
    title: "Science",
    description: "Physics, Chemistry, Biology & more",
  },
  {
    id: 85,
    imageSrc: "https://via.placeholder.com/400x300",
    title: "English",
    description: "Literature, Writing & Communication",
  },
  {
    id: 70,
    imageSrc: "https://via.placeholder.com/400x300",
    title: "Languages",
    description: "Spanish, French, German & more",
  },
  {
    id: 60,
    imageSrc: "https://via.placeholder.com/400x300",
    title: "Social Studies",
    description: "History, Geography & Government",
  },
  {
    id: 110,
    imageSrc: "https://via.placeholder.com/400x300",
    title: "Test Prep",
    description: "SAT, ACT, AP & College Prep",
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

        <h2 className=" max-w-[729.34px] mx-auto flex flex-col justify-center items-center text-center md:text-6xl text-5xl font-black leading-tight text-[#1E293B] mb-[15px]">
          Master Any Subject{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#0891B2]">
            With Expert Guidance
          </span>
        </h2>
      </div>
      {/*  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-x-[115px] gap-y-8 gap max-w-[1378px] mx-auto px-8 mt-8 md:mt-[84px]">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            id={subject.id}
            title={subject.title}
            imageSrc={subject.imageSrc}
            description={subject.description}
          />
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

const SubjectCard = ({ id, imageSrc, title, description }: SubjectProps) => {
  return (
    <div className="rounded-3xl border border-gray-100  md:w-96">
      {/* img */}
      <div className="w-full md:h-48 rounded-t-3xl overflow-hidden relative">
        <Image
          src="https://img.freepik.com/free-photo/elder-professor-standing-near-chalkboard-classroom_23-2148201092.jpg?semt=ais_hybrid&w=740&q=80"
          alt={title}
          className="w-full h-full object-cover "
          width={600}
          height={300}
        />
        <div className="shrink-0 [background:linear-gradient(0deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.00)_100%)] absolute inset-0 rounded-t-3xl" />
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
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </p>
      </div>
    </div>
  );
};
