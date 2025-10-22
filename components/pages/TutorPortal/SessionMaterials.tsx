"use client";

import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
// components/SessionMaterials.tsx
import FileIcon from "@/components/icons/FileIcon";
import PdfIcon from "@/components/icons/PdfIcon";
import { useUpdateSession } from "@/hooks/useTutorSessions";
import { privateAxios } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Trash2, Upload, Users } from "lucide-react";
import React, { useState } from "react";

const fetchSessonsMaterials = async () => {
  const res = await privateAxios.get("/teacher/getAllMets");
  return res.data;
};

interface Session {
  subject: string;
  instructor: string;
  time: string;
  duration: string;
  files: string[];
}

const uplaodMaterial = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("materials", file);

      const res = await privateAxios.post(
        `/teacher/upload/${courseId}`,
        formData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
};

const SessionMaterials = () => {
  const {
    data: sessionsData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["materials"],
    queryFn: fetchSessonsMaterials,
  });

  const { mutate: uploadMaterial, isPending } = useUpdateSession();

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    sessionId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadMaterial({ sessionId, file });
  };

  console.log(sessionsData?.creator?.Create_Session);

  // handle error and loading
  if (isFetching) return <LoadingState />;
  if (isError) return <ErrorState />;
  // main component
  return (
    <div className=" border rounded-2xl overflow-hidden bg-white">
      <h2 className="text-xl font-semibold p-8">All Sessions Materials</h2>
      {sessionsData?.creator?.Create_Session.map((session, index) => (
        <div
          key={index}
          className="bg-white border-t border-gray-200 p-6  mx-auto"
        >
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
                <p className="text-gray-600 mb-2">
                  with {session?.instructor || "N/A"}
                </p>
                <p className="text-gray-500 text-sm">
                  {session?.time || "N/A"} • {session?.duration || "N/A"} •
                  {session?.type || "N/A"}
                </p>
              </div>
            </div>

            {/* download button */}

            <input
              id={`file-${session.id}`}
              name="file"
              type="file"
              className="hidden"
              onChange={(e) => handleFileUpload(e, session.id)}
            />
            <label
              id={`file-${session.id}`}
              className="flex items-center space-x-2.5 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Upload className="w-5 h-5 text-[#141B34]" />
              <span className="text-gray-700">
                  {isPending ? "Uploading..." : "Upload Materials"}
                </span>
            </label>
          </div>

          {/* Files */}
          {session.pdf_attachment.length > 0 ? (
            <div className="space-y-6">
              {session.pdf_attachment.map((file, index) => (
                <div
                  key={index}
                  className="flex  items-center justify-between gap-4 p-3 bg-[#F6F8FA] rounded-[10px] cursor-pointer border-l-2 border-[#6366F1]"
                >
                  <div className="flex items-center gap-2.5 t">
                    <span className="w-8 h-8 ">
                      <FileIcon />
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
          ) : (
            <p className="text-gray-700">No file Available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SessionMaterials;

const fakeSessions: Session[] = [
  {
    subject: "Calculus",
    instructor: "Sarah Johnson",
    time: "1/15/2024 at 3:00 PM",
    duration: "60 min",
    files: [], // Multiple files for each session
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
    ],
  },
];
