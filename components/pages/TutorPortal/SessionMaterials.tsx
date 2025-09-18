// components/SessionMaterials.tsx
import PdfIcon from "@/components/icons/PdfIcon";
import { Download, Trash2, Upload, Users } from "lucide-react";
import React from "react";

interface Session {
  subject: string;
  instructor: string;
  time: string;
  duration: string;
  files: string[]; // Array of files for each session
}

const sessions: Session[] = [
  {
    subject: "Calculus",
    instructor: "Sarah Johnson",
    time: "1/15/2024 at 3:00 PM",
    duration: "60 min",
    files: ["calculus-session-materials.pdf", "calculus-practice-problems.pdf"], // Multiple files for each session
  },
  {
    subject: "Physics",
    instructor: "John Doe",
    time: "1/16/2024 at 4:00 PM",
    duration: "90 min",
    files: [
      "physics-session-materials.pdf",
      "physics-notes.pdf",
      "physics-solution-guide.pdf",
    ], // Multiple files
  },
];

const SessionMaterials = () => {
  return (
    <div className=" border rounded-2xl overflow-hidden bg-white">
      <h2 className="text-xl font-semibold p-8">All Sessions Materials</h2>
      {sessions.map((session, index) => (
        <div className="bg-white border-t border-gray-200 p-6  mx-auto">
          {/* Header */}

          <div className="flex flex-wrap gap-4 items-center justify-between  mb-[25px]">
            <div className="flex items-center gap-9">
              <span className=" p-4 rounded-2xl bg-[#ECEFF3]">
                <Users className="w-8 h-8" />
              </span>
              <div>
                <h1 className="text-xl font-semibold text-slate-800 leading-7 ">
                  {session.subject}
                </h1>
                <p className="text-gray-600 mb-2">with {session.instructor}</p>
                <p className="text-gray-500 text-sm">
                  {session.time} • {session.duration} • Virtual
                </p>
              </div>
            </div>

            {/* download button */}
            <button className="flex items-center space-x-2.5 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-[#141B34]" />
              <span className="text-gray-700">Upload Materials</span>
            </button>
          </div>

          {/* Files */}
          <div className="space-y-6">
            {session.files.map((file, index) => (
              <div
                key={index}
                className="flex  items-center justify-between gap-4 p-3 bg-[#F6F8FA] rounded-[10px] cursor-pointer border-l-2 border-[#6366F1]"
              >
                <div className="flex items-center gap-2.5 t">
                  <span className="w-8 h-8 ">
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.33203 18.0006L5.35862 5.99768C5.36187 4.52606 6.55663 3.33528 8.02824 3.33692L17.3264 3.34726L26.6654 12.6633L26.655 18.0006M17.332 4.00062V10.0006C17.332 11.4734 18.5259 12.6673 19.9987 12.6673H25.9987"
                        stroke="url(#paint0_linear_5515_21290)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M25.9987 23.0029C26.551 23.0029 26.9987 22.5552 26.9987 22.0029C26.9987 21.4507 26.551 21.0029 25.9987 21.0029V23.0029ZM21.332 22.0029V21.0029C20.7798 21.0029 20.332 21.4507 20.332 22.0029H21.332ZM20.332 30.0029C20.332 30.5552 20.7798 31.0029 21.332 31.0029C21.8843 31.0029 22.332 30.5552 22.332 30.0029H20.332ZM25.332 27.0029C25.8843 27.0029 26.332 26.5552 26.332 26.0029C26.332 25.4507 25.8843 25.0029 25.332 25.0029V27.0029ZM5.33203 22.0029V21.0029C4.77975 21.0029 4.33203 21.4507 4.33203 22.0029H5.33203ZM4.33203 30.0029C4.33203 30.5552 4.77975 31.0029 5.33203 31.0029C5.88431 31.0029 6.33203 30.5552 6.33203 30.0029H4.33203ZM13.332 22.0029V21.0029C12.7798 21.0029 12.332 21.4507 12.332 22.0029H13.332ZM13.332 30.0029H12.332C12.332 30.5552 12.7798 31.0029 13.332 31.0029V30.0029ZM25.9987 21.0029H21.332V23.0029H25.9987V21.0029ZM20.332 22.0029V26.0029H22.332V22.0029H20.332ZM20.332 26.0029V30.0029H22.332V26.0029H20.332ZM21.332 27.0029H25.332V25.0029H21.332V27.0029ZM5.33203 23.0029H7.66536V21.0029H5.33203V23.0029ZM6.33203 30.0029V26.6696H4.33203V30.0029H6.33203ZM6.33203 26.6696V22.0029H4.33203V26.6696H6.33203ZM7.66536 25.6696H5.33203V27.6696H7.66536V25.6696ZM8.9987 24.3363C8.9987 25.0727 8.40174 25.6696 7.66536 25.6696V27.6696C9.50631 27.6696 10.9987 26.1772 10.9987 24.3363H8.9987ZM7.66536 23.0029C8.40174 23.0029 8.9987 23.5999 8.9987 24.3363H10.9987C10.9987 22.4953 9.50631 21.0029 7.66536 21.0029V23.0029ZM13.332 23.0029H15.332V21.0029H13.332V23.0029ZM16.9987 24.6696V27.3363H18.9987V24.6696H16.9987ZM15.332 29.0029H13.332V31.0029H15.332V29.0029ZM14.332 30.0029V22.0029H12.332V30.0029H14.332ZM16.9987 27.3363C16.9987 28.2568 16.2526 29.0029 15.332 29.0029V31.0029C17.3571 31.0029 18.9987 29.3613 18.9987 27.3363H16.9987ZM15.332 23.0029C16.2526 23.0029 16.9987 23.7491 16.9987 24.6696H18.9987C18.9987 22.6445 17.3571 21.0029 15.332 21.0029V23.0029Z"
                        fill="url(#paint1_linear_5515_21290)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_5515_21290"
                          x1="5.33203"
                          y1="10.6688"
                          x2="26.6654"
                          y2="10.6688"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#6366F1" />
                          <stop offset="1" stop-color="#A855F7" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_5515_21290"
                          x1="4.33203"
                          y1="26.0029"
                          x2="26.9987"
                          y2="26.0029"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#6366F1" />
                          <stop offset="1" stop-color="#A855F7" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>

                  <span className="text-[color:var(--B,#070707)] [font-family:Inter] text-base font-normal leading-[160%] tracking-[0.08px]">
                    {file}
                  </span>
                </div>

                {/*  */}
                <div className="bg-white p-2 rounded-md">
                  <Trash2 className="w-4 h-4.5 text-red-500 hover:text-red-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionMaterials;
