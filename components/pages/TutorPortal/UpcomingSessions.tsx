"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import { UserIcon, Users, UsersIcon } from "lucide-react";
import React, { useState } from "react";
interface SessionCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  studentsCount: string;
  sessionDetails: string;
  onStartSession: () => void;
}

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
  return (
    <section className=" divide-y divide-[#E5E7EB] rounded-2xl border bg-white">
      <div className="px-8 py-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold leading-8">Upcoming Sessions</h3>

        <button className="px-[17px] py-3 rounded-xl bg-[#F97316] text-white font-semibold leading-6">
          + Create Session
        </button>
      </div>

      {/* class cards */}

      {fakeSessions.map((session) => (
        <SessionCard
          key={session.id}
          icon={session.icon}
          title={session.title}
          studentsCount={session.studentsCount}
          sessionDetails={session.sessionDetails}
          onStartSession={onStartSession}
        />
      ))}
    </section>
  );
}

// ======================== session card ===========================

const SessionCard: React.FC<SessionCardProps> = ({
  icon: Icon,
  title,
  studentsCount,
  sessionDetails,
  onStartSession,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 flex items-center justify-between bg-white">
      {/* Left */}
      <div className="flex items-center gap-9">
        <div className="p-4 rounded-[11px] text-white bg-gradient-to-r from-[#6366F1] to-[#A855F7]">
          <Icon className="w-8 h-8" />
        </div>

        <div>
          <p className="text-xl text-slate-800 font-semibold leading-7">
            {title}
          </p>
          <p className="text-gray-600">{studentsCount}</p>
          <p className="text-gray-500">{sessionDetails}</p>
        </div>
      </div>

      {/* Right */}
      <div className="space-x-3">
        <button
          onClick={onStartSession}
          className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] px-5 py-3 text-center rounded-xl text-white cursor-pointer"
        >
          Start Session
        </button>
        <button
          onClick={openModal} // Open the modal when "Edit" button is clicked
          className="px-5 py-[10px] border-gray-300 rounded-xl text-slate-800 border cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* Modal for Editing */}
      <CustomDialog open={isModalOpen} setOpen={setIsModalOpen}>
        <h2 className="text-xl font-semibold mb-4">Edit Session</h2>
        <div className="space-y-4">
          {/* Add your form or input fields here */}
          <input
            type="text"
            placeholder="Enter new session details"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-5 py-2 text-white bg-gray-500 rounded-lg"
            >
              Cancel
            </button>
            <button className="px-5 py-2 text-white bg-blue-500 rounded-lg">
              Save
            </button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};
