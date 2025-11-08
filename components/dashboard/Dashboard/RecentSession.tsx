"use client";

import { MoreHorizontal } from "lucide-react";
import { useSessionDetails, useSessions } from "../Sessions/useSessions";
import { useState } from "react";
import ActionModal from "@/components/reusable/AdminActionModal";

export default function RecentSessions() {
  const { data: sData, isLoading, isError } = useSessions();
  const sessionsData = getRecentSessions(sData?.data);
  const recentFiveSessions = sessionsData.slice(0, 6);

  // handle view
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionId, setSessionsId] = useState<string | null>(null);

  const {
    data: sessionDetails,
    isLoading: sessionDetailsLoading,
    isError: sessionDetailsError,
  } = useSessionDetails(sessionId);

  console.log("Sessions Details: ", sessionDetails);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Recent Sessions</h2>
      </div>
      <div className="space-y-4">
        {recentFiveSessions.map((session, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 px-4 border bg-gray-100/50 rounded-xl"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 text-sm">
                  {session.student}
                </span>
                <span className="text-gray-400 text-sm">→</span>
                <span className="font-medium text-gray-900 text-sm">
                  {session.tutor}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {session.date} • {session.subject}
              </p>
            </div>
            <div
              onClick={() => {
                setModalOpen(true);
                setSessionsId(session.id)
              }}
              className="flex items-center space-x-2"
            >
              <button className="px-3 py-1 text-xs font-medium text-purple-600 hover:bg-purple-50 rounded border border-purple-200">
                View
              </button>
              {/* <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      <ActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        actionType={"view"}
        data={sessionDetails}
        isDetailsLoading={sessionDetailsLoading}
      />
    </div>
  );
}

function getRecentSessions(sessions: any) {
  if (!sessions || !Array.isArray(sessions)) return [];

  return sessions.flatMap((session) => {
    const id = session.id;
    const subject = session.subject;
    const tutor = session.tutor_name;

    // Loop through all booked students
    return (session.Book_Session || []).map((studentObj: any) => ({
      id: id,
      student: studentObj.name,
      tutor: tutor,
      date: session.available_slots_time_and_date?.[0]?.split("T")[0] || "", // take first slot's date
      subject: subject,
    }));
  });
}
