"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { privateAxios } from "@/lib/axios";
import { Diamond, UserPen } from "lucide-react";
import Link from "next/link";

import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import BookingFlow from "../FindTutors/BookingFlow";
import ReportButton from "@/components/common/ReportButton";

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

interface TutorProfileCardProps {
  id: string;
  isEdit?: boolean;
}

const TutorProfileCard = ({ id, isEdit = true }: TutorProfileCardProps) => {
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

  console.log("Teacher", teacher);

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
    about: teacher.about_me ?? "N/A",
    sessionGrade: teacher.grades_taught ?? "N/A",
    profilePicture: teacher.avatar_url ?? "/profile-placeholder.jpg",
    qualifications: teacher.qualifications ?? [],
    certifications: teacher.certifications ?? [],
    phone: teacher.phone_number,
    email: teacher.email,
    gender: teacher.gender,
    joinedDate: joinedDate,
  };

  return (
    <>
      <div className="py-6 sm:py-10 max-w-[902px] mx-auto bg-white rounded-2xl divide-y divide-[#E5E7EB] border">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-6 py-6 sm:py-9 gap-6 sm:gap-0">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-9">
            <img
              className="w-[80px] h-[80px] sm:w-[92px] sm:h-[92px] rounded-[20px] object-cover mx-auto sm:mx-0"
              // src={profile.profilePicture}
                src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${profile.profilePicture}`}
              alt={profile.name}
              crossOrigin=""
            />
            <div className="space-y-1.5 sm:space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-[28px] font-semibold text-[#1E293B]">
                {profile.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base  capitalize ">
                {profile.role}
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                {profile.location}
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                Phone:{" "}
                <span className="text-gray-800 font-medium">
                  {safe(profile.phone)}
                </span>
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                Email:{" "}
                <span className="text-gray-800 font-medium">
                  {safe(profile.email)}
                </span>
              </p>
              {/* <p className="text-gray-500 text-sm sm:text-base">
                Gender:{" "}
                <span className="text-gray-800 font-medium">
                  {safe(profile.gender)}
                </span>
              </p> */}
              <p className="text-gray-500 text-sm sm:text-base">
                Joined on:{" "}
                <span className="text-gray-800 font-medium">
                  {profile.joinedDate}
                </span>
              </p>
            </div>
          </div>

          {/* Actions (if re-enabled later) */}
          <div className="flex sm:flex-col gap-3 sm:gap-4 items-center sm:items-end mt-4 sm:mt-0">
            {isEdit ? (
              <Link href={`/tutor-portal/profile/${profile.id}`}>
                <button className="flex gap-2.5 px-4 py-2.5 border-gray-300 border rounded-xl font-medium text-sm sm:text-base hover:bg-gray-50">
                  <UserPen className="w-5 h-5" />
                  Edit
                </button>
              </Link>
            ) : (
              <div>
                <BookingFlow />

                <ReportButton tutorId={profile.id} userType="Teacher" />
              </div>
            )}
          </div>
        </div>

        {/* About */}
        <div className="px-4 sm:px-6 py-6 sm:py-9">
          <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-5 text-[#1E293B]">
            About
          </h3>
          <p className="text-gray-600 leading-6 text-sm sm:text-base">
            {profile.about}
          </p>
        </div>

        {/* Qualifications & Certifications */}
        <div className="px-4 sm:px-6 py-6 sm:py-9">
          <h3 className="font-semibold text-lg sm:text-xl mb-4 sm:mb-5 text-[#1E293B]">
            Qualifications & Certificates
          </h3>

          {profile.qualifications.length > 0 && (
            <ul className="mb-6 sm:mb-8 space-y-2">
              {profile.qualifications.map((q, i) => (
                <li
                  key={i}
                  className="flex gap-2 items-center text-sm sm:text-base"
                >
                  <Diamond className="w-3 h-3 text-blue-500 fill-blue-300 shrink-0" />
                  <span className="text-gray-600 font-medium">{q}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
            {profile.certifications.length > 0 ? (
              profile.certifications.map((url, i) => (
                <img
                  key={i}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/certificate/${url}`}
                  alt={`Certificate ${i + 1}`}
                  className="h-[200px] sm:h-[264px] w-full md:w-1/2 rounded-xl object-cover border"
                  crossOrigin=""
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
        <div className="px-4 sm:px-6 py-6 sm:py-9">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5">
            Session Grades & Levels
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            {profile.sessionGrade && profile.sessionGrade.length > 0
              ? profile.sessionGrade.toString()
              : "No grades available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default TutorProfileCard;
