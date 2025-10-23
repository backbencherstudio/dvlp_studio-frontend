"use client";

import { useAuth } from "@/context/AuthContext";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { UserPen } from "lucide-react";
import Link from "next/link";
import React from "react";

const fetchStudentById = async (id: string) => {
  const { data } = await privateAxios.get(`/students/${id}`);
  return data?.data; // access the actual student object
};

const ProfileCard = () => {
  const { user } = useAuth();

  const { data: student, isLoading, isError } = useQuery({
    queryKey: ["student", user?.id],
    queryFn: () => {
      if (!user) throw new Error("User not found");
      return fetchStudentById(user.id);
    },
    enabled: !!user?.id,
  });

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-500">Loading profile...</div>
    );

  if (isError || !student)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load student profile.
      </div>
    );

  // fallback helper
  const safe = (value: any) =>
    value && value !== "null" && value !== null && value !== undefined
      ? value
      : "N/A";

  const fullName = `${safe(student.first_name)} ${safe(student.last_name)}`;
  const location =
    safe(student.city) !== "N/A" || safe(student.country) !== "N/A"
      ? `${safe(student.city)}, ${safe(student.country)}`
      : "N/A";

  return (
    <div className="max-w-[902px] mx-auto bg-white rounded-2xl divide-y divide-[#E5E7EB] border">
      {/* Top Section */}
      <div className="flex items-start justify-between px-6 py-9">
        {/* Profile info */}
        <div className="flex gap-9">
          <img
            className="w-[92px] h-[92px] rounded-[23px] object-cover"
            src={
              safe(student.avatar) !== "N/A"
                ? student.avatar
                : "https://via.placeholder.com/92x92?text=No+Image"
            }
            alt={fullName}
          />

          <div className="space-y-2">
            <h2 className="text-[28px] font-semibold leading-7 text-[#1E293B] mb-4">
              {fullName}
            </h2>
            <p className="text-gray-600">Student</p>
            <p className="text-gray-500">{location}</p>
            <p className="text-gray-500">
              Total Bookings:{" "}
              <span className="text-gray-800 font-medium">
                {safe(student.totalBookedSessions)}
              </span>
            </p>
          </div>
        </div>

        {/* Edit button */}
        <Link href={`/student-portal/profile/${safe(student.id)}`}>
          <button className="flex cursor-pointer gap-2.5 px-4 py-3 border-gray-300 border rounded-xl font-medium leading-6">
            <UserPen className="w-5 h-5" />
            <span className="text-[#374151]">Edit</span>
          </button>
        </Link>
      </div>

      {/* About Section */}
      <div className="px-6 py-9">
        <h3 className="font-semibold text-xl mb-5 text-[#1E293B]">About</h3>
        <p className="text-gray-600 leading-6">{safe(student.about_me)}</p>
      </div>

      {/* Grade & Level Section */}
      <div className="px-6 py-9">
        <h3 className="text-xl font-semibold leading-7 mb-5">
          Session Grades & Levels
        </h3>
        <p className="text-gray-700 text-sm">{safe(student.grade_level)}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
