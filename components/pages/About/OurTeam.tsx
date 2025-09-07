import BookIcon from "@/components/icons/BookIcon";
import Image from "next/image";
import React from "react";

const teamMembers = [
  {
    id: "1",
    name: "Dr. Alan Smith",
    role: "Founder & CEO",
    description:
      "Former MIT professor with 20+ years in educational technology",
    imageUrl: "https://img.freepik.com/free-photo/business-owner-working-their-strategy_23-2149241318.jpg",
  },
  {
    id: "2",
    name: "Jessica Lee",
    role: "Head of Operations",
    description:
      "Experienced operations leader with expertise in scaling EdTech companies",
    imageUrl: "https://img.freepik.com/free-photo/portrait-young-smiling-woman-looking-camera_23-2148187139.jpg?semt=ais_incoming&w=740&q=80",
  },
  {
    id: "3",
    name: "David Brown",
    role: "Academic Director",
    description:
      "PhD in Educational Psychology, passionate about personalized learning systems",
    imageUrl: "https://img.freepik.com/free-photo/business-man-working-laptop_23-2148908918.jpg",
  },
];

export default function OurTeam() {
  return (
    <section className="bg-white lg:py-[128px] md:py-25 sm:py-20 py-15 ">
      <div className="max-w-[1280px] mx-auto md:px-6 px-4 ">
        {/* title */}
        <div className="mb-[74px]  space-y-[17.33px] flex flex-col items-center  ">
          <div className="inline-flex items-center gap-2 [background:linear-gradient(90deg,#DCFCE7_0%,#D1FAE5_100%)] px-6 py-3 rounded-full mb-4">
            <span className="w-4 h-4  text-[#16A34A]">
              <BookIcon />
            </span>
            <span className="text-sm font-semibold leading-5 text-[#166534]">
              Our Team
            </span>
          </div>

          <h2 className="max-w-[880px] text-center text-6xl font-black text-[#1E293B] flex flex-col">
            <span>Meet the Passion </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#16A34A] to-[#059669]">
              Leaders Behind Our Mission
            </span>
          </h2>
        </div>

        {/* teams */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[33.8px]">
          {teamMembers?.map((member) => (
            <div
              key={member?.id}
              className=" shrink-0 border border-gray-100 [background:#FFF] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] rounded-3xl border-solid"
            >
              {/* img */}
              <div className=" h-80 relative rounded-t-3xl overflow-hidden ">
                <Image className="w-full h-full object-cover " src={member.imageUrl} alt={member.name} width={382} height={320} />
                <div className=" absolute inset-0 [background:linear-gradient(0deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.00)_100%)] object-cover
                " />
              </div>
              {/* info */}
              <div className="text-center pt-8 pb-9 px-[28px]">
                <h3 className=" text-slate-800 text-center text-2xl font-bold leading-8 mb-2">
                  {member.name}
                </h3>
                <p className="font-semibold leading-6 text-indigo-500 mb-[19.33px]">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-[26px]">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
