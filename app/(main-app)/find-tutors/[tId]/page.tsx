"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Diamond } from "lucide-react";
import ReportButton from "@/components/common/ReportButton";
import BookingFlow from "@/components/pages/FindTutors/BookingFlow";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { privateAxios } from "@/lib/axios";
import FindTutorHero from "@/components/pages/FindTutors/FindTutorHero";
import TutorDetailsHero from "@/components/pages/FindTutors/TutorDetailsHero";

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
  qulifications: string[];
  certifications: string[];
}

const fetchTutorById = async (id: string) => {
  const response = await privateAxios.get(`/teacher/get/${id}`);
  // const response = await privateAxios.get(
  //   `/teacher/get/cmg0dx5ku0000uv9ctf4k75gw`
  // );
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
    role: "N/A",
    location: tutorData.city
      ? tutorData.country
        ? `${tutorData.city}, ${tutorData.country}`
        : tutorData.city
      : "N/A",
    totalSessions: "N/A",
    earningAmount: "N/A",
    about: tutorData.about_me ?? "N/A",
    sessionGrade: "N/A",
    profilePicture:
      tutorData.avatar_url ??
      "https://via.placeholder.com/100x100?text=No+Image",
    qulifications: tutorData.qulifications ?? [
      "PhD in Theoretical Physics",
      "MSc in Applied Math",
      "BSc in Physics",
    ],
    certifications: tutorData.certifications_urls ?? [],
  };

  return (
    <div className="py-50">
      {/* Profile info */}
      <div className="max-w-[902px] mx-auto bg-white rounded-2xl divide-y divide-[#E5E7EB] border">
        {/* Header Section */}
        <div className="flex justify-between px-6 py-9">
          <div className="flex flex-wrap gap-2 items-start justify-between">
            {/* Profile Details */}
            <div className="flex gap-9">
              <img
                className="w-[92px] h-[92px] rounded-[23px] object-cover"
                src={profile.profilePicture}
                alt={profile.name}
              />
              <div className="space-y-2">
                <h2 className="text-[28px] font-semibold leading-7 text-[#1E293B] mb-4">
                  {profile.name}
                </h2>
                <p className="text-gray-600">{profile.role}</p>
                <p className="text-gray-500">{profile.location}</p>
                <p className="text-gray-500">
                  Total Session:{" "}
                  <span className="text-gray-800 font-medium">
                    {profile.totalSessions}
                  </span>
                </p>
                <p className="text-gray-500">
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
            {/* {tId && <ReportButton tutorId={tId} />} */}
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 py-9">
          <h3 className="font-semibold text-xl mb-5 text-[#1E293B]">About</h3>
          <p className="text-gray-600 leading-6">{profile.about}</p>
        </div>

        {/* Qualification Section */}
        <div className="px-6 py-9">
          <h3 className="font-semibold text-xl mb-5 text-[#1E293B]">
            Qualifications & Certificates
          </h3>

          <ul className="mb-8">
            {profile.qulifications.map((item, i) => (
              <li key={i} className="flex gap-2 items-center">
                <Diamond className="w-3 h-3 text-blue-500 fill-blue-300 shrink-0" />
                <span className="text-gray-600 font-medium leading-6">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col md:flex-row gap-8">
            {profile.certifications.length > 0 ? (
              profile.certifications.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Certificate ${i + 1}`}
                  className="h-[264px] w-full md:w-1/2 rounded-xl object-cover border"
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

export default function page() {
  return (
    <div>
      <TutorDetailsHero />
      <div className="-mt-36">
        <TutorProfile />
      </div>
    </div>
  );
}
