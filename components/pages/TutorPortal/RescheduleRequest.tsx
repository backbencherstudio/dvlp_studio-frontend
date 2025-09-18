"use client";
import CustomDialog from "@/components/reusable/CustomDialog";
import { Check, Download, Trash2, Upload, Users, X } from "lucide-react";
import { useState } from "react";
import DeclinePopup from "./DeclinePopup";
import RescheduleForm from "./RescheduleForm";

interface Request {
  reqId: string | number;
  subject: string;
  instructor: string;
  reason: string;
}

const requests: Request[] = [
  {
    reqId: 12,
    subject: "Calculus",
    instructor: "Sarah Johnson",
    reason:
      "I missed the class because I was feeling unwell and had a doctor’s appointment, so I couldn’t attend on time.",
  },
  {
    reqId: 34,
    subject: "Physics",
    instructor: "John Doe",
    reason:
      "I sincerely apologize for missing the class. I was feeling unwell and had a doctor’s appointment, which prevented me from attending on time.",
  },
];

const RescheduleRequest = () => {
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);

  const onAcceptOpen = () => setAcceptOpen(true);
  const onAcceptClose = () => setAcceptOpen(false);

  const onDeclineOpen = () => setDeclineOpen(true);
  const onADeclineClose = () => setDeclineOpen(false);

  return (
    <>
      <div className=" border rounded-2xl overflow-hidden bg-white">
        <h2 className="text-xl font-semibold p-8">Reshcedule Request</h2>
        {requests.map((session, index) => (
          <>
            <div className="bg-white border-t border-gray-200 p-6  mx-auto">
              {/* Header */}

              <div className="flex flex-wrap gap-4 items-center justify-between  mb-[25px]">
                <div className="flex items-center gap-9">
                  <span className=" p-4 rounded-2xl bg-[#ECEFF3]">
                    <Users className="w-8 h-8" />
                  </span>
                  <div>
                    <h1 className="text-xl font-semibold text-slate-800 leading-7 ">
                      {session.instructor}
                    </h1>
                    <p className="text-gray-600 mb-2"> {session.subject}</p>
                  </div>
                </div>

                {/* action button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={onAcceptOpen}
                    className="flex items-center justify-center px-4 py-3 gap-2.5 bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white  rounded-xl cursor-pointer"
                  >
                    <span className="p-[2px] bg-white/12 rounded-full">
                      <Check />
                    </span>
                    <span className="font-medium"> Accept</span>
                  </button>
                  <button
                    onClick={onDeclineOpen}
                    className="flex items-center justify-center px-4 py-3 gap-2.5  text-slate-800 border rounded-xl border-gray-300 cursor-pointer"
                  >
                    <span className="p-[2px] bg-gray-500/12 rounded-full">
                      <X />
                    </span>
                    <span className="font-medium"> Decline</span>
                  </button>
                </div>
              </div>

              {/* Files */}
              <div className=" p-4 bg-[#F6F8FA] space-y-3 rounded-xl">
                <p className="text-red-500">Reason:</p>
                <p className="text-[#4A4C56]">{session.reason}</p>
              </div>
            </div>

            {/* accept modal */}
            <CustomDialog open={acceptOpen} setOpen={setAcceptOpen}>
              <RescheduleForm onClose={onAcceptClose} />
            </CustomDialog>

            {/* reject modal */}
            <CustomDialog open={declineOpen} setOpen={setDeclineOpen}>
              <DeclinePopup onClose={onADeclineClose} reqId={session.reqId} />
            </CustomDialog>
          </>
        ))}
      </div>
    </>
  );
};

export default RescheduleRequest;
