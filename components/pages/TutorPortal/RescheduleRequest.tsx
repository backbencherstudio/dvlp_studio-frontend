"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/lib/axios";
import { Check, Users, X } from "lucide-react";

import CustomDialog from "@/components/reusable/CustomDialog";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import RescheduleForm from "./RescheduleForm";
import DeclinePopup from "./DeclinePopup";
import SuccessModal from "@/components/reusable/SuccessModal";

/* -----------------------------
   Types
----------------------------- */
export interface RescheduleRequestItem {
  id: string; // unique request ID (cuid)
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null; // null if not deleted
  username: string; // student username
  subject: string; // subject name
  book_session_id: string; // related booking/session ID
  user_id: string; // user who made the request
  rescheduled_date: string | null; // null until accepted
  reason: string; // reason text
  is_accepted: boolean | number; // 0 or 1 (server boolean flag)
  is_rejected: boolean | number; // 0 or 1 (server boolean flag)
  join_link: string | null; // optional join link
  reject_reason: string | null; // optional reason for rejection
}

/* -----------------------------
   Fetch function
----------------------------- */
const fetchRescheduleRequests = async (): Promise<RescheduleRequestItem[]> => {
  const res = await privateAxios.get("/teacher/reschedule-requests");
  return res.data; // ✅ return only data
};

/* -----------------------------
   Component
----------------------------- */
export default function RescheduleRequest() {
  const {
    data: requests,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["rescheduleRequests"],
    queryFn: fetchRescheduleRequests,
  });

  const [currentSession, setCurrentSession] =
    useState<RescheduleRequestItem | null>(null);
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAcceptOpen = (session: RescheduleRequestItem) => {
    setCurrentSession(session);
    setAcceptOpen(true);
  };

  const handleDeclineOpen = (session: RescheduleRequestItem) => {
    setCurrentSession(session);
    setDeclineOpen(true);
  };

  const handleAcceptClose = () => setAcceptOpen(false);
  const handleDeclineClose = () => setDeclineOpen(false);

  /* -----------------------------
     Loading & Error States
  ----------------------------- */
  if (isFetching) return <LoadingState height="400px" />;
  if (isError) return <ErrorState height="400px" />;

  /* -----------------------------
     Empty State
  ----------------------------- */
  if (!requests || requests.length === 0) {
    return (
      <div className="border rounded-2xl overflow-hidden bg-white p-10 text-center text-gray-600">
        No reschedule requests found.
      </div>
    );
  }

  /* -----------------------------
     Render List
  ----------------------------- */
  return (
    <div className="border rounded-2xl overflow-hidden bg-white">
      <h2 className="text-xl font-semibold p-8">Reschedule Requests</h2>

      {requests.map((session) => (
        <div
          key={session.id}
          className="bg-white border-t border-gray-200 p-6 mx-auto"
        >
          {/* Header */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <span className="p-4 rounded-2xl bg-[#ECEFF3]">
                <Users className="w-8 h-8 text-slate-700" />
              </span>
              <div>
                <h1 className="text-xl font-semibold text-slate-800 leading-7">
                  {session.username}
                </h1>
                <p className="text-gray-600">{session.subject}</p>
              </div>
            </div>

            {session.is_accepted === 0 && session.is_rejected === 0 ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAcceptOpen(session)}
                  className="flex items-center justify-center px-5 py-3 gap-2 bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white rounded-xl hover:opacity-90 transition-all"
                >
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Accept</span>
                </button>

                <button
                  onClick={() => handleDeclineOpen(session)}
                  className="flex items-center justify-center px-5 py-3 gap-2 border border-gray-300 text-slate-800 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <X className="w-5 h-5" />
                  <span className="font-medium">Decline</span>
                </button>
              </div>
            ) : session.is_accepted === 1 ? (
              <p className="text-green-600 font-medium">Accepted</p>
            ) : session.is_rejected === 1 ? (
              <p className="text-red-600 font-medium">Rejected</p>
            ) : null}

            {/* Action Buttons */}
          </div>

          {/* Reason Box */}
          <div className="p-4 bg-[#F6F8FA] rounded-xl space-y-2">
            <p className="text-red-500 font-medium">Reason:</p>
            <p className="text-[#4A4C56] leading-relaxed">{session.reason}</p>
          </div>
        </div>
      ))}

      {/* Accept Modal */}
      <CustomDialog open={acceptOpen} setOpen={setAcceptOpen}>
        {currentSession && (
          <RescheduleForm
            sessionInfo={currentSession}
            onClose={handleAcceptClose}
            onSuccess={() => setIsSuccess(true)}
          />
        )}
      </CustomDialog>

      {/* Decline Modal */}
      <CustomDialog open={declineOpen} setOpen={setDeclineOpen}>
        {currentSession && (
          <DeclinePopup
            onClose={handleDeclineClose}
            reqId={currentSession.id}
          />
        )}
      </CustomDialog>

      <SuccessModal
        open={isSuccess}
        setOpen={setIsSuccess}
        title="Request Accepted Successfully"
        message="You have accepted the reschedule request successfully."
      />
    </div>
  );
}
