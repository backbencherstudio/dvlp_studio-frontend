"use client"

import { privateAxios } from "@/lib/axios";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

// server side data fetching

async function getStudentData(sid: string) {
  try {
    const res = await privateAxios.get(`/student/student/${sid}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching tutor data", error);
    return null;
  }

}

export default function page({ params }: { params: { sid: string } }) {

  const { sid } = params ;

  const {data, isLoading, isError} = useStudentnDetails(sid);
  const studentData = data?.data;

  console.log(data)
 

  return (
    <section className="md:p-6">
      <p className="mb-4 flex">
        <Link href={"/admin-dashboard/tutors/"}>Students</Link>  <ChevronRight /><span className="text-gray-500">Student Details: {sid}</span></p>
      <div className="p-4 rounded-md">
        <h3 className=" text-black [font-family:Inter] text-xl font-medium leading-[160%] tracking-[0.1px] mb-4">
          {/* Tutor Details: {params.sid} */}
        </h3>

        <div className="p-6 border rounded-lg">
          {
            studentData ? (
              <pre>{JSON.stringify(studentData, null, 2)}</pre>
              // <TutorDetails data={studentData.data} />
            ) : (
              <p>No data found for this tutor.</p>
            )
          }
        </div>
      </div>
    </section>
  );
}





import { User } from "lucide-react";
import { useStudentnDetails } from "@/components/dashboard/Students/useStudent";

type Tutor = {
  first_name: string;
  last_name: string;
  email: string | null;
  country: string | null;
  city: string | null;
  about_me: string | null;
  avatar_url: string | null;
  totalSessions: number | null;
  totalEarnings: number | null;
  certifications: string[];
  grades_taught: string[];
  created_at: string;
};

function TutorDetails({
  data,
}: {
  data: Tutor;
}) {
  return (
    <section className="">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Tutor Details</h2>

      <div className="shadow-sm rounded-lg">
        <div className="p-4 md:p-6 space-y-4 ">
          {/* Personal Info */}
          <div className="flex flex-col gap-4 md:flex-row  items-start md:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="text-gray-500" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {data.first_name} {data.last_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {data.city || "N/A"}, {data.country || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Subjects:{" "}
                  {data.grades_taught?.length
                    ? data.grades_taught.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="md:text-right">
              <p className="text-base font-semibold text-gray-900">
                ${"null"}/hr
              </p>
              <p className="text-sm text-gray-600">
                {data.email || "No email"}
              </p>
              <p className="text-sm text-gray-600">Phone: null</p>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">About Herself:</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.about_me ||
                "No description provided by the tutor."}
            </p>
          </div>

        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  mt-5 gap-6">

        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">Total Sessions</p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">{data.totalSessions ?? 0}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">Pending</p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">{0}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">Completed</p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">32</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">Cancelled</p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">1</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-2xl space-y-4">
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-base font-medium leading-[160%] tracking-[0.08px]">Revenue</p>
          <p className="text-[color:var(--Gray-Black-400,#4A4C56)]  [font-family:Inter] text-2xl font-semibold leading-[130%]">$ {data.totalEarnings ?? 0}</p>
        </div>

      </div>
    </section>
  );
}
{/* Extra Info */ }
// <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4">
//   <div>
//     <span className="font-medium text-gray-800">Joined:</span>
//     <p className="text-gray-600">
//       {new Date(data.created_at).toLocaleDateString()}
//     </p>
//   </div>
//   <div>
//     <span className="font-medium text-gray-800">Sessions:</span>
//     <p className="text-gray-600">{data.totalSessions ?? 0} </p>
//   </div>
//   <div>
//     <span className="font-medium text-gray-800">Earnings:</span>
//     <p className="text-gray-600">${data.totalEarnings ?? 0}</p>
//   </div>
//   <div>
//     <span className="font-medium text-gray-800">Certifications:</span>
//     <p className="text-gray-600">
//       {data.certifications?.length
//         ? data.certifications.join(", ")
//         : "N/A"}
//     </p>
//   </div>
// </div>