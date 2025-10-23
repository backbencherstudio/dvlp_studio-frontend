"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/lib/axios";
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";
import FileIcon from "@/components/icons/FileIcon";
import { Upload, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

interface Session {
  id: string;
  subject: string;
  user_id: string;
  session_type: string;
  pdf_attachment: string[];
}

interface SessionsResponse {
  creator: {
    name: string;
    Create_Session: Session[];
  };
}

// Fetch all sessions
const fetchSessionsMaterials = async (): Promise<SessionsResponse> => {
  const res = await privateAxios.get("/teacher/getAllMets");
  return res.data;
};

const SessionMaterials = () => {
  const queryClient = useQueryClient();
  const [uploadingSession, setUploadingSession] = useState<string | null>(null);

  // Fetch sessions
  const {
    data: sessionsData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["materials"],
    queryFn: fetchSessionsMaterials,
  });

  // Mutation: upload material
  const uploadMaterialMutation = useMutation({
    mutationFn: async ({
      sessionId,
      file,
    }: {
      sessionId: string;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append("materials", file);

      const res = await privateAxios.post(
        `/teacher/upload/${sessionId}`,
        formData
      );
      return { sessionId, fileNames: res.data.fileNames }; // only pass fileNames
    },
    onMutate: ({ sessionId }) => {
      setUploadingSession(sessionId);
    },
    onSuccess: ({ sessionId, fileNames }) => {
      queryClient.setQueryData(["materials"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          creator: {
            ...oldData.creator,
            Create_Session: oldData.creator.Create_Session.map(
              (session: Session) =>
                session.id === sessionId
                  ? {
                      ...session,
                      pdf_attachment: [...session.pdf_attachment, ...fileNames],
                    }
                  : session
            ),
          },
        };
      });
    },
    onSettled: () => setUploadingSession(null),
  });

  // Mutation: delete file
  const deleteFileMutation = useMutation({
    mutationFn: async ({
      sessionId,
      fileName,
    }: {
      sessionId: string;
      fileName: string;
    }) => {
      await privateAxios.delete(`/teacher/delete-file/${sessionId}`, {
        data: { fileName },
      });
      return { sessionId, fileName };
    },
    onSuccess: ({ sessionId, fileName }) => {
      queryClient.setQueryData(["materials"], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          creator: {
            ...oldData.creator,
            Create_Session: oldData.creator.Create_Session.map(
              (session: Session) =>
                session.id === sessionId
                  ? {
                      ...session,
                      pdf_attachment: session.pdf_attachment.filter(
                        (f) => f !== fileName
                      ),
                    }
                  : session
            ),
          },
        };
      });
    },
    onError: () => {
      toast.error("Document Delete Failed!");
    },
  });

  // Handle file upload
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    sessionId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadMaterialMutation.mutate({ sessionId, file });
  };

  // Handle file delete
  const handleDeleteFile = (sessionId: string, fileName: string) => {
    deleteFileMutation.mutate({ sessionId, fileName });
  };

  if (isFetching) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <div className="border rounded-2xl overflow-hidden bg-white">
      <h2 className="text-xl font-semibold p-8">All Sessions Materials</h2>

      {sessionsData?.creator?.Create_Session.map((session: Session) => (
        <div
          key={session.id}
          className="bg-white border-t border-gray-200 p-6 mx-auto"
        >
          {/* Header */}
          <div className="flex flex-wrap gap-4 items-center justify-between mb-[25px]">
            <div className="flex items-center gap-9">
              <span className="p-4 rounded-2xl bg-[#ECEFF3]">
                <Users className="w-8 h-8" />
              </span>
              <div>
                <h1 className="text-xl font-semibold text-slate-800 leading-7">
                  {session.subject}
                </h1>
                <p className="text-gray-600 mb-2">with {session.user_id}</p>
                <p className="text-gray-500 text-sm">{session.session_type}</p>
              </div>
            </div>

            {/* Upload */}
            <input
              id={`file-input-${session.id}`}
              type="file"
              className="hidden"
              onChange={(e) => handleFileUpload(e, session.id)}
            />
            <label
              htmlFor={`file-input-${session.id}`}
              className="flex items-center space-x-2.5 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Upload className="w-5 h-5 text-[#141B34]" />
              <span>
                {uploadingSession === session.id
                  ? "Uploading..."
                  : "Upload Materials"}
              </span>
            </label>
          </div>

          {/* Files */}
          {session.pdf_attachment.length > 0 ? (
            <div className="space-y-6">
              {session.pdf_attachment.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 p-3 bg-[#F6F8FA] rounded-[10px] border-l-2 border-[#6366F1]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8">
                      <FileIcon />
                    </span>
                    <span className="text-base font-normal text-[color:var(--B,#070707)]">
                      {file}
                    </span>
                  </div>
                  <div
                    className="bg-white p-2 rounded-md cursor-pointer"
                    onClick={() => handleDeleteFile(session.id, file)}
                  >
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
