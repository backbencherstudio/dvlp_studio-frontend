"use client";

import { privateAxios } from "@/lib/axios";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TutorDetailsPage() {
  const params = useParams();
  const { tid } = params;

  const [tutorData, setTutorData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutorData = async () => {
      if (!tid) return;

      try {
        setLoading(true);
        // Fetch tutor data
        const tutorRes = await privateAxios.get(`/teacher/get/${tid}`);
        setTutorData(tutorRes.data);

        // If you need stats separately, you can fetch them here too
        // const statsRes = await privateAxios.get(`/teacher/stats/${tid}`);
        // setTutorStats(statsRes.data);

        setError(null);
      } catch (error) {
        console.log("Error fetching tutor data", error);
        setError("Failed to fetch tutor data");
        setTutorData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorData();
  }, [tid]);

  if (loading) {
    return (
      <section className="md:p-6">
        <div className="p-6 border rounded-lg">
          <p>Loading tutor data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="md:p-6">
        <div className="p-6 border rounded-lg">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="md:p-6">
      <p className="mb-4 flex items-center">
        <Link href="/admin-dashboard/tutors/" className="hover:underline">
          Tutors
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="text-gray-500">Tutors Details</span>
      </p>

      <div className="p-4 rounded-md">
        <h3 className="text-black font-inter text-xl font-medium leading-[160%] tracking-[0.1px] mb-4">
          Tutor Details: {tid}
        </h3>

        <div className="p-6 border rounded-lg">
          {tutorData ? (
            <>
              <pre className="whitespace-pre-wrap overflow-auto">
                {/* {JSON.stringify(tutorData, null, 2)} */}
              </pre>
              <TutorDetails data={tutorData?.data} />
            </>
          ) : (
            <p className="text-gray-500">No data found for this tutor.</p>
          )}
        </div>
      </div>
    </section>
  );
}
import { User } from "lucide-react";
import TutorDetailStats from "./TutorDetailStats";
import { TutorSessionTable } from "./TutorSessionTable";
import { useQuery } from "@tanstack/react-query";
import { id } from "date-fns/locale";

type Tutor = {
  id: string;
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

function TutorDetails({ data }: { data: Tutor }) {
  return (
    <section className="">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Tutor Details
      </h2>

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
              {data.about_me || "No description provided by the tutor."}
            </p>
          </div>
        </div>
      </div>

      <TutorDetailStats id={data.id} />

      <TutorSessionTable id={data.id} />
    </section>
  );
}
{
  /* Extra Info */
}
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
