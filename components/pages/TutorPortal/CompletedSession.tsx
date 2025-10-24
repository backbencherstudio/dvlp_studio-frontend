"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/lib/axios";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { Users } from "lucide-react";

/* -----------------------------
   Fetch function
----------------------------- */
const fetchCompletedSessions = async () => {
  const res = await privateAxios.get("/teacher/my-ended-sessions");
  return res.data;
};

/* -----------------------------
   Card Component
----------------------------- */
function CompletedSessionCard({ subject, username, session_date }: any) {
  // Format date and time
  const dateObj = new Date(session_date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const startTime = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const endTimeObj = new Date(dateObj.getTime() + 60 * 60 * 1000);
  const endTime = endTimeObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="flex items-start justify-between p-4 md:p-6 border-t border-gray-100 hover:bg-gray-50 transition">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 rounded-md p-3">
          <Users />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{subject}</h4>
          <p className="text-sm text-gray-500">with {username}</p>
          <p className="text-sm text-gray-500">N/A</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <p className="text-sm text-gray-700">
          {startTime} to {endTime}
        </p>
        <p className="text-sm font-medium text-gray-900">60 min (mock)</p>
      </div>
    </div>
  );
}

/* -----------------------------
   Main Component
----------------------------- */
export default function CompletedSessions({
  isSeeAll = true,
}: {
  isSeeAll: boolean;
}) {
  const {
    data: sessions,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["completedSessions"],
    queryFn: fetchCompletedSessions,
  });

  console.log("Completed sessions:", sessions?.data);

  if (isFetching) return <LoadingState height="500px" />;
  if (isError) return <ErrorState height="400px" />;

  const completed = sessions?.data?.filter((s: any) => s.is_completed);

  return (
    <section className="divide-y divide-gray-200 rounded-2xl border bg-white overflow-hidden">
      <div className="p-4 md:p-8 flex justify-between items-center">
        <h3 className="text-2xl font-semibold leading-8">Completed Sessions</h3>
        {isSeeAll && (
          <button className="text-sm text-teal-600 hover:underline">
            See All
          </button>
        )}
      </div>

      {completed.length > 0 ? (
        completed.map((session: any) => (
          <CompletedSessionCard
            key={session.id}
            subject={session.subject}
            username={session.username}
            session_date={session.session_date}
          />
        ))
      ) : (
        <p className="p-8 text-center text-gray-500">
          No completed sessions found.
        </p>
      )}
    </section>
  );
}
