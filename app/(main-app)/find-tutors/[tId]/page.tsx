"use client";

import ReportButton from "@/components/common/ReportButton";
import BookingFlow from "@/components/pages/FindTutors/BookingFlow";
import { Diamond } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface TutorProfile {
  id: string | number;
  name: string;
  role: string;
  location: string;
  totalSessions: number;
  earningAmount: number;
  about: string;
  sessionGrade: string;
  profilePicture: string;
}

const profile: TutorProfile = {
  id: 123,
  name: "Michael Thompson",
  role: "Student",
  location: "New York, USA",
  totalSessions: 12,
  earningAmount: 480,
  about:
    "Michael has over 12 years of experience teaching physics and mathematics to high school and college students. He specializes in making complex concepts easy to understand and enjoys helping students achieve their academic goals.",
  sessionGrade: "High School (Grades 9—12)",
  profilePicture:
    "https://img.freepik.com/premium-photo/indian-male-model_928503-1122.jpg?w=1000",
};

const TutorProfileDetails = () => {
  
  const params = useParams();
  const { tId } = params;

  return (
    <div className="py-50">
      {/* Profile info */}
      <div className="max-w-[902px] mx-auto bg-white rounded-2xl  divide-y divide-[#E5E7EB] border ">
        <div className="flex  justify-between px-6 py-9">
          <div className="flex flex-wrap gap-2 items-start justify-between ">
            {/* profile info */}
            <div className="flex gap-9">
              <img
                className="w-[92px] h-[92px] rounded-[23px]"
                src={profile.profilePicture}
                alt={profile.name}
              />
              <div className="space-y-2">
                <h2 className="text-[28px] font-semibold leading-7 text-[#1E293B] mb-4">
                  {profile.name}
                </h2>
                <p className="text-gray-600">{profile.role}</p>
                <p className="text-gray-500">{profile.location}</p>
                <p className=" text-gray-500">
                  Total Session:{" "}
                  <span className="text-gray-800 font-medium">
                    {profile.totalSessions}
                  </span>
                </p>
                <p className=" text-gray-500">
                  Earning Amount:{" "}
                  <span className="text-gray-800 font-medium">
                    {profile.earningAmount}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/4 space-y-4">
            <BookingFlow />
            <ReportButton tutorId={tId} />
          </div>
        </div>
        <div className="px-6 py-9">
          <h3 className="font-semibold text-xl mb-5 text-[#1E293B]">About</h3>
          <p className="text-gray-600 leading-6 ">{profile.about}</p>
        </div>

        <div className="px-6 py-9">
          <h3 className="font-semibold text-xl mb-5 text-[#1E293B]">
            Qualifications & Certificates
          </h3>

          <div>
            <ul className="mb-8">
              {[
                "Phd in theoriticl physics",
                "MSc in applied math",
                "BSc in physics",
              ].map((item) => (
                <li className="flex gap-2 items-center">
                  <span className=" shrink-0">
                    <Diamond className="w-3 h-3 text-blue-500 fill-blue-300 " />
                  </span>
                  <span className="text-gray-600 font-medium leading-6">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col md:flex-row gap-8 ">
              <div className="h-[264px]  w-full md:w-1/2 bg-blue-200 rounded-xl"></div>
              <div className="h-[264px] w-full md:w-1/2 bg-red-200 rounded-xl"></div>
            </div>
          </div>

          <div></div>
          <div />

          <div className="px-6 py-9">
            <h3 className="text-xl font-semibold leading-7 mb-5">
              Session Grades & Levels
            </h3>
            <p className="text-gray-700 text-sm">{profile.sessionGrade}</p>
          </div>
        </div>
      </div>
    

    </div>
  );
};

export default TutorProfileDetails;
