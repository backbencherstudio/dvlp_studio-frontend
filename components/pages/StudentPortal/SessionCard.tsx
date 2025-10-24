"use client";
import BookIcon from "@/components/icons/BookIcon";
import CalenderIcon from "@/components/icons/CalenderIcon";
import RescheduleModal from "./RescheduleModal";

export interface SessionCardProps {
  bookingId: string;
  studentUsername: string;
  sessionDate: string;
  isJoined: boolean;
  isCancelled: boolean;
  isCompleted: boolean;
  status: string;
  sessionDetails: {
    sessionId: string;
    teacherId: string;
    teacherName: string;
    avatar: string | null;
    sessionType: string;
    subject: string;
    charge: string;
    mode: "In_Person" | "Virtual";
    joinLink?: string;
  };
  rescheduleDetails?: any;
  onReschedule?: () => void;
}

export default function SessionCard({
  bookingId,
  sessionDate,
  isJoined,
  isCancelled,
  isCompleted,
  status,
  sessionDetails,
  rescheduleDetails,
}: SessionCardProps) {
  const { subject, teacherName, mode, joinLink } = sessionDetails;

  // Format date and time
  const dateObj = new Date(sessionDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Conditions
  const showEndedMessage = isCompleted && !isCancelled;
  const showRescheduleButton = showEndedMessage && !rescheduleDetails;
  const isRescheduleRequested = status === "Reschedule_requested";

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        {/* Subject + Tutor */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white">
            <BookIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">{subject}</p>
            <p className="text-sm text-gray-600">with {teacherName}</p>
          </div>
        </div>

        {/* Date + Time */}
        <div className="text-right text-sm text-gray-500">
          <div className="flex items-center gap-1 justify-end">
            <CalenderIcon className="w-4 h-4" />
            {formattedDate}
          </div>
          <div>
            {formattedTime} • {mode.replace("_", " ")}
          </div>
        </div>
      </div>

      {/* Status Message */}
      {showEndedMessage && (
        <div className="p-3 border border-dashed border-red-300 bg-red-50 rounded-lg text-sm text-red-700">
          Your session has ended. You can request a reschedule within 3 hours.
        </div>
      )}

      {isRescheduleRequested && rescheduleDetails?.isAccepted && (
        <div className="p-3 border border-dashed border-yellow-300 bg-yellow-50 rounded-lg text-sm text-yellow-700">
          Rescheduled to{" "}
          <span className="font-semibold">
            {new Date(rescheduleDetails.rescheduledDate).toLocaleString()}
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        {/* ✅ Upcoming or Pending */}
        {!isCancelled && !isCompleted && !isRescheduleRequested && (
          <>
            {joinLink && (
              <a
                href={joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md hover:opacity-90"
              >
                Join Session
              </a>
            )}

            <RescheduleModal
              data={{ tutor: teacherName, subject, id: bookingId }}
              color={false}
            />
            <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
          </>
        )}

        {/* ✅ Completed but reschedulable */}
        {showRescheduleButton && (
          <>
            <RescheduleModal
              data={{ tutor: teacherName, subject, id: bookingId }}
              color={true}
            />
            <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
          </>
        )}

        {/* ✅ Already Requested Reschedule */}
        {isRescheduleRequested && (
          <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-md">
            Reschedule Requested
          </span>
        )}

        {/* ✅ Cancelled */}
        {isCancelled && (
          <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-md">
            Cancelled
          </span>
        )}
      </div>
    </div>
  );
}
