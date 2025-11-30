"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Diamond } from "lucide-react";
import ReportButton from "@/components/common/ReportButton";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { privateAxios } from "@/lib/axios";
import FindTutorHero from "@/components/pages/FindTutors/FindTutorHero";
import TutorDetailsHero from "@/components/pages/FindTutors/TutorDetailsHero";
import BookingFlow2 from "@/components/pages/FindTutors/Booking/BookingFlow";

interface TutorProfile {
  id: string;
  name: string;
  role: string;
  location: string;
  totalSessions: string | number;
  earningAmount: string | number;
  about: string;
  sessionGrade: string;
  profilePicture: string;
  qualifications: string[];
  certifications: string[];
}

const fetchTutorById = async (id: string) => {
  const response = await privateAxios.get(`/teacher/get/${id}`);
  return response.data;
};

const TutorProfile = () => {
  const params = useParams();
  const tId = Array.isArray(params.tId) ? params.tId[0] : params.tId;

  const {
    data: tdata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tutorProfile", tId],
    queryFn: () => fetchTutorById(tId as string),
    enabled: !!tId,
  });

  const tutorData = tdata?.data;

  console.log("tutorData", tutorData);

  if (isLoading) return <LoadingState />;
  if (isError || !tutorData) return <ErrorState />;

  const profile: TutorProfile = {
    id: tutorData.id ?? "N/A",
    name:
      `${tutorData.first_name ?? ""} ${tutorData.last_name ?? ""}`.trim() ||
      "N/A",
    role: tutorData.type === "teacher" ? "Teacher" : "N/A",
    location: tutorData.city && tutorData.country
      ? `${tutorData.city}, ${tutorData.country}`
      : tutorData.city || tutorData.country || "Location not specified",
    totalSessions: tutorData.totalSessions ?? 0,
    earningAmount: tutorData.totalEarnings 
      ? `$${tutorData.totalEarnings}`
      : "$0",
    about: tutorData.about_me || "No description provided.",
    sessionGrade: Array.isArray(tutorData.grades_taught) && tutorData.grades_taught.length > 0
      ? tutorData.grades_taught.join(", ")
      : "No grades specified",
    profilePicture:
      tutorData.avatar_url && !tutorData.avatar_url.includes("null")
        ? tutorData.avatar_url
        : "https://via.placeholder.com/100x100?text=No+Image",
    qualifications: tutorData.qualifications || [
      // "PhD in Theoretical Physics",
      // "MSc in Applied Math",
      // "BSc in Physics",
    ],
    certifications: tutorData.certifications || [],
  };

  return (
    <div className="py-30 md:py-50 px-4 lg:px-0">
      {/* Profile info */}
      <div className="max-w-[902px] mx-auto bg-white rounded-2xl divide-y divide-[#E5E7EB] border  lg:mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-6 py-6 lg:py-9 gap-6 lg:gap-0">
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-9 w-full lg:w-auto">
            {/* Profile Image */}
            <div className="flex justify-center sm:justify-start">
              <img
                className="w-20 h-20 sm:w-[92px] sm:h-[92px] rounded-2xl lg:rounded-[23px] object-cover"
                src={profile.profilePicture}
                alt={profile.name}
              />
            </div>
            
            {/* Profile Details */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-[28px] font-semibold leading-7 text-[#1E293B] mb-3 sm:mb-4">
                {profile.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">{profile.role}</p>
              <p className="text-gray-500 text-sm sm:text-base">{profile.location}</p>
              <p className="text-gray-500 text-sm sm:text-base">
                Total Sessions:{" "}
                <span className="text-gray-800 font-medium">
                  {profile.totalSessions}
                </span>
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                Ratting:{" "}
                <span className="text-gray-800 font-medium">
                  {/* {profile.rating} */}
                </span>
              </p>
            </div>
          </div>
          
          {/* Booking and Report Section */}
          <div className="w-full lg:w-1/4 space-y-4 flex flex-col items-center sm:items-end">
            <div className="w-full max-w-xs">
              <BookingFlow2 tutor={tutorData} />
            </div>
            {/* {tId && <ReportButton tutorId={tId} />} */}
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 lg:px-6 py-6 lg:py-9">
          <h3 className="font-semibold text-lg lg:text-xl mb-4 lg:mb-5 text-[#1E293B]">
            About
          </h3>
          <p className="text-gray-600 leading-6 text-sm lg:text-base">
            {profile.about}
          </p>
        </div>

        {/* Qualification Section */}
        <div className="px-4 lg:px-6 py-6 lg:py-9">
          <h3 className="font-semibold text-lg lg:text-xl mb-4 lg:mb-5 text-[#1E293B]">
            Qualifications & Certificates
          </h3>

          <ul className="mb-6 lg:mb-8 space-y-2">
            {profile.qualifications.map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <Diamond className="w-3 h-3 text-blue-500 fill-blue-300 shrink-0 mt-1.5" />
                <span className="text-gray-600 font-medium leading-6 text-sm lg:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {profile.certifications.length > 0 ? (
              profile.certifications.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Certificate ${i + 1}`}
                  className="h-48 lg:h-[264px] w-full lg:w-1/2 rounded-xl object-cover border"
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No certifications uploaded.
              </p>
            )}
          </div>
        </div>

        {/* Session Grades */}
        <div className="px-4 lg:px-6 py-6 lg:py-9">
          <h3 className="text-lg lg:text-xl font-semibold leading-7 mb-4 lg:mb-5">
            Session Grades & Levels
          </h3>
          <p className="text-gray-700 text-sm lg:text-base">
            {profile.sessionGrade}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function page() {
  return (
    <div>
      <TutorDetailsHero />
      <div className="lg:-mt-36 -mt-20">
        <TutorProfile />
      </div>
    </div>
  );
}