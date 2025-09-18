import { OctagonAlert } from "lucide-react";
import React from "react";

interface DeclinePopup {
  onClose: () => void;
  reqId: number | string;
}
export default function DeclinePopup({ onClose, reqId }: DeclinePopup) {
  const handleDecline = () => {
    console.log("Delete this", reqId);
    onClose();
  };
  return (
    <div className="flex flex-col items-center">
      {/* Success Icon */}
      <div className="w-16 h-16 rounded-full border-4 border-[#F8BAB942] flex items-center justify-center text-red-500 mb-4">
        <OctagonAlert />
      </div>

      {/* Dynamic Title */}
      <h2 className="text-center mb-4 text-xl  text-slate-800 font-medium">
        Decline Request
      </h2>

      {/* Dynamic Message */}
      <p className="mb-9 max-w-[339px] mx-auto text-gray-400 text-center">
        Are you sure you want to decline this reschedule request?
      </p>

      {/* Back Button */}
      <div className="mt-4 flex items-center gap-4  w-full">
        <button
          onClick={onClose}
          className="w-full flex justify-center items-center gap-2.5 flex-[1_0_0] border border-gray-300 px-4 py-3 rounded-xl border-solid text-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={handleDecline}
          className="flex justify-center items-center gap-2.5 flex-[1_0_0] px-4 py-3 rounded-xl bg-red-500 text-white"
        >
          Yes, Decline
        </button>
      </div>
    </div>
  );
}
