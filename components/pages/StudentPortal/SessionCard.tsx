import BookIcon from "@/components/icons/BookIcon";
import CalenderIcon from "@/components/icons/CalenderIcon";
import RescheduleModal from "./RescheduleModal";

interface SessionCardProps {
  subject: string;
  tutor: string;
  date: string;
  time: string;
  mode: "Virtual" | "In-person";
  status?: "upcoming" | "ended" | "reschedule" | "rescheduleRequested";
  joinLink?: string;
}

export default function SessionCard({
  subject,
  tutor,
  date,
  time,
  mode,
  status = "upcoming",
  joinLink,
}: SessionCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow border border-gray-200 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {/* icon */}
            <div className="flex items-center justify-center p-4 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-2xl text-white">
              <BookIcon className="w-8 h-8" />
            </div>
            <div>
              <p> {subject}</p>
              <p className="text-sm text-gray-600">with {tutor}</p>
            </div>
          </h3>
        </div>

        {/* Date + Time */}
        <div className="text-right text-sm text-gray-500">
          <div className="flex items-center gap-1 justify-end">
            <CalenderIcon className="w-4 h-4" />
            {date}
          </div>
          <div>
            {time} • {mode}
          </div>
        </div>
      </div>

      {/* Extra info if session ended */}
      {status === "ended" && (
        <div className="p-3 border border-dashed border-red-300 bg-red-50 rounded-lg text-sm text-red-700">
          Your session has ended. If you’d like to retake the missed session,
          kindly submit a reschedule request within 3 hours.
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        {status === "upcoming" && (
          <>
            {joinLink && (
              <a
                href={joinLink}
                target="_blank"
                className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white rounded-md hover:bg-purple-700"
              >
                Join Session
              </a>
            )}
            <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
              Reschedule
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
              Cancel
            </button>
          </>
        )}

        {status === "ended" && (
          <>
            {/* <button className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white rounded-md hover:bg-purple-700 cursor-pointer">
              Reschedule
            </button> */}
            <RescheduleModal/>
            <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
              Cancel
            </button>
          </>
        )}

        {status === "rescheduleRequested" && (
          <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-600 rounded-md">
            Reschedule Requested
          </span>
        )}
      </div>
    </div>
  );
}
