"use client";

import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Download, FileDown, Users } from "lucide-react";
import React from "react";

const BASE_URL =
  `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/material/`;


// 🧩 Fetch session materials
const useSessionMaterials = () => {
  return useQuery({
    queryKey: ["sessionMaterials"],
    queryFn: async () => {
      const response = await privateAxios.get("/students/sessionss");
      return response.data; // Adjust based on your API shape
    },
  });
};

// 🧩 Component
const SessionMaterials = () => {
  const { data: bdata, isFetching, isError } = useSessionMaterials();
  const bookings = bdata?.bookings;

  if (isFetching) return <LoadingState />;
  if (isError) return <ErrorState />;

  // 📥 Helper to download all PDFs of a session
  const handleDownloadAll = (attachments: string[]) => {
    attachments.forEach((file) => {
      const fullUrl = `${BASE_URL}${encodeURIComponent(file)}`;
      const link = document.createElement("a");
      link.href = fullUrl;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="border rounded-2xl overflow-hidden bg-white">
      <h2 className="text-xl font-semibold p-6 sm:p-8">
        All Sessions Materials
      </h2>

      {bookings?.map((session: any, idx: number) => (
        <div
          key={idx}
          className="bg-white border-t border-gray-200 p-4 sm:p-6 mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-[25px] gap-4 sm:gap-0">
            <div className="flex items-center gap-4 sm:gap-9">
              <span className="p-3 sm:p-4 rounded-2xl bg-[#ECEFF3]">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              </span>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-slate-800 leading-7">
                  {session.sessionDetails.subject}
                </h1>
                <p className="text-gray-600 mb-1">
                  with {session.sessionDetails.teacherName}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(session.sessionDate).toLocaleString()} •{" "}
                  {session.sessionDetails.mode === "In_Person"
                    ? "In Person"
                    : "Virtual"}
                </p>
              </div>
            </div>

            {/* Download All Button */}
            {session.sessionDetails.pdfAttachment?.length > 0 && (
              <button
                onClick={() =>
                  handleDownloadAll(session.sessionDetails.pdfAttachment)
                }
                className="flex items-center space-x-2.5 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#141B34]" />
                <span className="text-gray-700 text-sm sm:text-base">
                  Download Materials
                </span>
              </button>
            )}
          </div>

          {/* File List */}
          <div className="space-y-3 sm:space-y-6">
            {session.sessionDetails.pdfAttachment?.length > 0 ? (
              session.sessionDetails.pdfAttachment.map(
                (file: string, i: number) => {
                  const fullUrl = `${BASE_URL}${encodeURIComponent(file)}`;
                  return (
                    <a
                      key={i}
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-2 sm:p-3 bg-[#F6F8FA] rounded-[10px] border-l-2 border-[#6366F1] hover:bg-[#EEF0F3] transition-colors"
                    >
                      <span className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600">
                        <FileDown />
                      </span>
                      <span className="text-base sm:text-[16px] font-normal text-[#070707] truncate">
                        {file}
                      </span>
                    </a>
                  );
                }
              )
            ) : (
              <p className="text-gray-500 text-sm sm:text-base">
                No materials uploaded.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionMaterials;
