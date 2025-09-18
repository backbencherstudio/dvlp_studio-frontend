// components/ProfileCard.tsx
import { UserPen } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Profile {
  id: string | number;
  name: string;
  role: string;
  location: string;
  totalBookings: number;
  about: string;
  sessionGrade: string;
  profilePicture: string;
}

const profile: Profile = {
  id: 123,
  name: "Michael Thompson",
  role: "Student",
  location: "New York, USA",
  totalBookings: 12,
  about:
    "Michael has over 12 years of experience teaching physics and mathematics to high school and college students. He specializes in making complex concepts easy to understand and enjoys helping students achieve their academic goals.",
  sessionGrade: "High School (Grades 9—12)",
  profilePicture: "https://img.freepik.com/premium-photo/indian-male-model_928503-1122.jpg?w=2000", 
};

const ProfileCard = () => {
  return (
    <div className="max-w-[902px] mx-auto bg-white rounded-2xl  divide-y divide-[#E5E7EB] border ">
      <div className="flex items-start justify-between px-6 py-9">
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
              Total Booking:{" "}
              <span className="text-gray-800 font-medium">
                {profile.totalBookings}
              </span>
            </p>
          </div>
        </div>
        {/* edit button */}
        <Link href={`/student-portal/profile/${profile.id}`}>
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
        <h3 className="text-xl font-semibold leading-7 mb-5">
          Session Grades & Levels
        </h3>
        <p className="text-gray-700 text-sm">{profile.sessionGrade}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
