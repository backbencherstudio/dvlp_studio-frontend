"use client";

import { useAuth } from "@/context/AuthContext";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
// components/ProfileCard.tsx
import { Diamond, UserPen } from "lucide-react";
import Link from "next/link";
import React from "react";

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
    "https://img.freepik.com/premium-photo/indian-male-model_928503-1122.jpg?w=2000",
};

const fetchStudentById = async (id: string) => {
  const { data } = await privateAxios.get(`/teacher/get/${id}`);
  return data;
};

const TutorProfileCard = () => {
  const { user } = useAuth();
  // console.log(user);

  const { data, isPending, isError } = useQuery({
    queryKey: ["teacher", user],
    queryFn: () => {
      if (!user) throw new Error("User not found");
      return fetchStudentById(user.id);
    },
    enabled: !!user?.id,
  });

  console.log("Teacher info", user);
  return (
    <div className="max-w-[902px] mx-auto bg-white rounded-2xl  divide-y divide-[#E5E7EB] border ">
      <div className="flex flex-wrap gap-2 items-start justify-between px-6 py-9">
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
        {/* edit button */}
        <Link href={`/tutor-portal/profile/${profile.id}`}>
          <button className="flex cursor-pointer  gap-2.5 px-4 py-3 border-gray-300 border rounded-xl font-medium leading-6 ">
            <UserPen className="w-5 h-5" />
            <span className="text-[#374151]"> Edit</span>
          </button>
        </Link>
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
  );
};

export default TutorProfileCard;
