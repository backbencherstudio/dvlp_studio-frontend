"use client";

import React from "react";
import SessionCard from "./SessionCard";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

/* -----------------------------
   Fetch function for sessions
----------------------------- */
const fetchStudentSessions = async () => {
  const res = await privateAxios.get("/students/sessions");
  return res.data;
};

/* -----------------------------
   Custom hook using React Query
----------------------------- */
function useStudentSessions() {
  return useQuery({
    queryKey: ["studentSessions"],
    queryFn: fetchStudentSessions,
  });
}

/* -----------------------------
   Component
----------------------------- */
export default function StudentPortalContents() {
  const { data, isPending, isError } = useStudentSessions();
  const bookings = data?.bookings || [];

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState />;

  if (bookings.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">No sessions found.</div>
    );
  }

  return (
    <div>
      <h3 className="p-2.5 text-slate-800 text-2xl font-semibold leading-8">
        Upcoming Sessions
      </h3>

      <div className="space-y-5">
        {bookings.map((item: any) => (
          <SessionCard
            key={item.bookingId}
            bookingId={item.bookingId}
            studentUsername={item.studentUsername}
            sessionDate={item.sessionDate}
            isJoined={item.isJoined}
            isCancelled={item.isCancelled}
            isCompleted={item.isCompleted}
            status={item.status}
            sessionDetails={item.sessionDetails}
            rescheduleDetails={item.rescheduleDetails}
          />
        ))}
      </div>
    </div>
  );
}
