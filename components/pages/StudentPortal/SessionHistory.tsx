"use client";

import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import Link from "next/link";

export interface SessionData {
  sessionId: string;
  studentUsername: string;
  sessionDate: string;
  isCompleted: number;
  sessionDetails: {
    teacherName: string;
    teacherId: string;
    avatar: string | null;
    sessionRate: number;
    subject: string;
    charge: string;
    sessionPeriod: string;
  };
}

const fetchCompletedSessions = async () => {
  const res = await privateAxios.get("/students/completed-sessions");
  return res.data;
};

const useCompletedSessions = () => {
  return useQuery({
    queryKey: ["completedSessions"],
    queryFn: fetchCompletedSessions,
  });
};

export default function SessionHistory() {
  const { data, isLoading, isError } = useCompletedSessions();
  //   handle loading and error
  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  //    ui
  return (
    <section className=" divide-y divide-[#E5E7EB] rounded-2xl border bg-white overflow-hidden">
      <div className="p-4 md:p-8 ">
        <h3 className="text-2xl font-semibold leading-8 ">Session History</h3>
      </div>

      {data?.completedSessions.length === 0 ? (
        <p className="text-center text-gray-500 py-6">
          No Seassion History Available!
        </p>
      ) : (
        <div className=" divide-y divide-[#E5E7EB] rounded-2xl border bg-white overflow-hidden">
          {data?.completedSessions?.map((s: any) => (
            <SessionCard
              key={s.sessionId}
              sessionId={s.sessionId}
              subject={s.sessionDetails.subject}
              teacherName={s.sessionDetails.teacherName}
              teacherId={s.sessionDetails.teacherId}
              sessionDate={s.sessionDate}
              sessionPeriod={s.sessionDetails.sessionPeriod}
              charge={s.sessionDetails.charge}
              rating={s.sessionDetails.sessionRate}
              avatar={s.sessionDetails.avatar}
            />
          ))}
        </div>
      )}
    </section>
  );
}

interface SessionCardProps {
  sessionId: string;
  subject: string;
  teacherName: string;
  teacherId: string;
  sessionDate: string;
  sessionPeriod: string;
  charge: string;
  rating: number;
  avatar?: string | null;
}

const SessionCard = ({
  sessionId,
  subject,
  teacherName,
  teacherId,
  sessionDate,
  sessionPeriod,
  charge,
  rating,
  avatar,
}: SessionCardProps) => {
  const formattedDate = new Date(sessionDate).toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const [openFeedback, setOpenFeedback] = useState(false);

  const handleFeedback = () => {
    setOpenFeedback(true);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-white  p-4 md:p-6 hover:shadow-md transition-all duration-200">
        {/* Left section */}
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            {avatar && avatar !== "null" ? (
              <img
                src={avatar}
                alt={teacherName}
                // width={56}
                // height={56}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-lg font-semibold text-gray-600">
                {teacherName[0]?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{subject}</h3>
            <p className="text-gray-600 text-sm ">
              with{" "}
              <Link
                href={`/student-portal/bookings/${teacherId}`}
                className="font-medium"
              >
                <span className="hover:underline underline-offset-2">
                  {teacherName}
                </span>
              </Link>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {formattedDate} • {sessionPeriod}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-end justify-between h-full">
          {rating ? (
            <div className="flex space-x-1 mb-2">
              {Array.from({ length: rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          ) : (
            <button
              onClick={handleFeedback}
              className="border rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition mb-2 cursor-pointer"
            >
              Give Feedback
            </button>
          )}
          <p className="text-gray-900 font-semibold text-lg">${charge}</p>
        </div>
      </div>

      <FeedbackModal
        open={openFeedback}
        setOpen={setOpenFeedback}
        sessionId={sessionId}
      />
    </>
  );
};
