"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import { UserIcon, Users, UsersIcon } from "lucide-react";
import { Clock } from "lucide-react";
import React, { useState } from "react";
import CreateSessionForm from "./CreateSessionForm";
import { useGetTeacherSessions } from "@/hooks/useTutorSessions";
import { se } from "date-fns/locale";
import SessionForm from "./CreateSessionForm";
import { transformSession } from "@/lib/utils";
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";

// Example fake data
const fakeSessions = [
  {
    id: 1,
    title: "Calculus",
    studentsCount: "24 Students",
    sessionDetails: "1/15/2024 at 3:00 PM • 60 min • Virtual",
    icon: UsersIcon,
  },
  {
    id: 2,
    title: "Physics",
    studentsCount: "18 Students",
    sessionDetails: "1/16/2024 at 10:00 AM • 45 min • In-person",
    icon: UserIcon,
  },
  {
    id: 3,
    title: "Chemistry",
    studentsCount: "20 Students",
    sessionDetails: "1/17/2024 at 2:00 PM • 50 min • Virtual",
    icon: UsersIcon,
  },
];
// Fake methods to pass into onStartSession and onEdit
const onStartSession = () => {
  console.log("Starting session...");
};

const onEdit = () => {
  console.log("Editing session...");
};

export default function UpcomingSessions() {
  const { data: sessions, isFetching, isError } = useGetTeacherSessions();

  console.log(sessions);

  const [isCreate, setIsCreate] = useState(false);
  const onClose = () => setIsCreate(false);

  if (isFetching) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <section className="divide-y divide-[#E5E7EB] rounded-2xl border bg-white">
      <div className="px-7 py-6 flex items-center justify-between flex-wrap">
        <h3 className="text-2xl font-semibold leading-8">Upcoming Sessions</h3>

        <button
          onClick={() => setIsCreate(true)}
          className="px-[16px] py-3 rounded-xl bg-[#F97316] hover:bg-amber-600 text-white font-semibold leading-6 mt-4 sm:mt-0 cursor-pointer"
        >
          + Create Session
        </button>
      </div>

      {/* loading */}
      {isFetching && (
        <div className="text-gray-500 text-center py-4 ">Loading...</div>
      )}

      {/* no sessions found */}
      {!isFetching && !isError && sessions?.length === 0 && (
        <div className="text-gray-500 text-lg text-center py-6">
          No sessions found!
        </div>
      )}

      {/* Session cards */}
      {!isFetching &&
        !isError &&
        sessions?.length > 0 &&
        sessions.map((session: SessionData) => (
          <SessionCard key={session.id} session={session} />
        ))}
      {/* create session modal */}
      <CustomDialog open={isCreate} setOpen={setIsCreate}>
        <CreateSessionForm onClose={onClose} />
      </CustomDialog>
    </section>
  );
}

// ======================== session card ===========================

interface SessionData {
  id: string;
  user_id: string;
  subject: string;
  session_charge: string;
  mode: string;
  slots_available: string | null;
  available_slots_time_and_date: string[];
  join_link: string;
  session_type: string;
}

interface SessionCardProps {
  session: SessionData;
}

function SessionCard({ session }: SessionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<any | null>(null);

  const handleEdit = (session: SessionData) => {
    setIsModalOpen(true);
    const formatedSession = transformSession(session);
    setCurrentSession(formatedSession);
    console.log(session);
  };

  const closeModal = () => setIsModalOpen(false);

  // Format time to readable
  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const sessionDate = formatDate(session.available_slots_time_and_date[0]);

  return (
    <div className="p-4 md:p-6 flex items-center justify-between bg-white flex-wrap gap-6">
      {/* Left Side */}
      <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
        <div className="p-4 rounded-[11px] text-white bg-gradient-to-r from-[#6366F1] to-[#A855F7]">
          <UsersIcon className="w-8 h-8" />
        </div>

        <div>
          <p className="text-xl text-slate-800 font-semibold leading-7">
            {session.subject} Session
          </p>
          <p className="text-gray-600 flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full inline-block mr-2"></span>{" "}
            <span className="font-medium">
              {session.mode.replace("_", " ")}
            </span>
          </p>
          <p className="text-gray-500">Charge: ${session.session_charge}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Clock size={16} />
            <span>
              {sessionDate} at{" "}
              {session.available_slots_time_and_date.map((slot, idx) => (
                <span key={idx}>
                  {formatTime(slot)}
                  {idx < session.available_slots_time_and_date.length - 1
                    ? " | "
                    : ""}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="space-x-3 flex flex-wrap gap-4 justify-center sm:justify-end">
        <button
          onClick={() => alert("Session Started")}
          className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] px-5 py-3 text-center rounded-xl text-white cursor-pointer"
        >
          Start Session
        </button>

        <button
          onClick={() => handleEdit(session)}
          className="px-5 py-[10px] border-gray-300 rounded-xl text-slate-800 border cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* Edit Modal */}
      <CustomDialog open={isModalOpen} setOpen={setIsModalOpen}>
        <SessionForm
          onClose={closeModal}
          session={currentSession}
          // session={{
          //   id: "cmfxgfro40001re5c53gk06cn",
          //   session_type: "new_session",
          //   subject: "Nest",
          //   session_charge: "90",
          //   mode: "In_Person",
          //   join_link: "zoom.com/meet123",
          //   available_slots_time_and_date: [
          //     { date: "2025-10-12", time: "10:00" },
          //     { date: "2025-10-12", time: "10:30" },
          //   ],
          // }}
        />
      </CustomDialog>
    </div>
  );
}
