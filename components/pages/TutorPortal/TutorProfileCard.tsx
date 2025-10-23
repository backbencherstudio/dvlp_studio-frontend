"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { privateAxios } from "@/lib/axios";
import { Diamond, UserPen } from "lucide-react";
import Link from "next/link";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

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
  phone?: string;
  email?: string;
  gender?: string;
  joinedDate?: string;
}

const fetchTeacherById = async (id: string) => {
  const response = await privateAxios.get(`/teacher/get/${id}`);
  return response.data;
};

const TutorProfileCard = ({ id }: { id: string }) => {
  // const { user } = useAuth();

  console.log("teacher id", id);

  const {
    data: tdata,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teacher", id],
    queryFn: () => {
      if (!id) throw new Error("User not found");
      return fetchTeacherById(id);
    },
    enabled: !!id,
  });

  const teacher = tdata?.data;

  if (isLoading) return <LoadingState />;
  if (isError || !teacher) return <ErrorState />;

  const safe = (val: any) =>
    val && val !== "null" && val !== null && val !== undefined ? val : "N/A";

  const joinedDate =
    teacher.created_at &&
    new Date(teacher.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const profile: TutorProfile = {
    id: teacher.id ?? "N/A",
    name:
      `${teacher.first_name ?? ""} ${teacher.last_name ?? ""}`.trim() ||
      safe(teacher.name),
    role: safe(teacher.type),
    location: teacher.city
      ? teacher.country
        ? `${teacher.city}, ${teacher.country}`
        : teacher.city
      : "N/A",
    totalSessions: "N/A",
    earningAmount: "N/A",
    about: teacher.about ?? "N/A",
    sessionGrade: teacher.grade_level ?? "N/A",
    profilePicture:
      teacher.avatar_url ?? "https://via.placeholder.com/100x100?text=No+Image",
    qualifications: teacher.qualifications ?? [],
    certifications: teacher.certifications_urls ?? [],
    phone: teacher.phone_number,
    email: teacher.email,
    gender: teacher.gender,
    joinedDate: joinedDate,
  };

  return (
    <div className="py-10 max-w-[902px] mx-auto bg-white rounded-2xl divide-y divide-[#E5E7EB] border">
      {/* Header */}
      <div className="flex justify-between px-6 py-9">
        <div className="flex gap-9">
          <img
            className="w-[92px] h-[92px] rounded-[23px] object-cover"
            src={profile.profilePicture}
            alt={profile.name}
          />
          <div className="space-y-2">
            <h2 className="text-[28px] font-semibold text-[#1E293B]">
              {profile.name}
            </h2>
            <p className="text-gray-600">{profile.role}</p>
            <p className="text-gray-500">{profile.location}</p>
            <p className="text-gray-500">
              Phone:{" "}
              <span className="text-gray-800 font-medium">
                {safe(profile.phone)}
              </span>
            </p>
            <p className="text-gray-500">
              Email:{" "}
              <span className="text-gray-800 font-medium">
                {safe(profile.email)}
              </span>
            </p>
            <p className="text-gray-500">
              Gender:{" "}
              <span className="text-gray-800 font-medium">
                {safe(profile.gender)}
              </span>
            </p>
            <p className="text-gray-500">
              Joined on:{" "}
              <span className="text-gray-800 font-medium">
                {profile.joinedDate}
              </span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link href={`/tutor-portal/profile/${profile.id}`}>
            <button className="flex gap-2.5 px-4 py-3 border-gray-300 border rounded-xl font-medium cursor-pointer">
              <UserPen className="w-5 h-5" />
              Edit
            </button>
          </Link>
        </div>
      </div>

      {/* About */}
      <div className="px-6 py-9">
        <h3 className="font-semibold text-xl mb-5 text-[#1E293B]">About</h3>
        <p className="text-gray-600 leading-6">{profile.about}</p>
      </div>

      {/* Qualifications & Certifications */}
      <div className="px-6 py-9">
        <h3 className="font-semibold text-xl mb-5 text-[#1E293B]">
          Qualifications & Certificates
        </h3>

        {profile.qualifications.length > 0 && (
          <ul className="mb-8">
            {profile.qualifications.map((q, i) => (
              <li key={i} className="flex gap-2 items-center">
                <Diamond className="w-3 h-3 text-blue-500 fill-blue-300 shrink-0" />
                <span className="text-gray-600 font-medium">{q}</span>
              </li>
            ))}
          </ul>
        )}

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
            <p className="text-gray-500 text-sm">No certifications uploaded.</p>
          )}
        </div>
      </div>

      {/* Session Grades */}
      <div className="px-6 py-9">
        <h3 className="text-xl font-semibold mb-5">Session Grades & Levels</h3>
        <p className="text-gray-700">{profile.sessionGrade}</p>
      </div>
    </div>
  );
};

export default TutorProfileCard;
