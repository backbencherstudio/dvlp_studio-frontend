"use client";
import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Flag, Calendar, User } from "lucide-react";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

const fetchreports = async () => {
  const response = await privateAxios.get("/help-and-support/all-reports");
  return response.data.data;
};

export const UsersReport = () => {
  const {
    data: reports,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: fetchreports,
  });

  if (isFetching) return <LoadingState />;
  if (isError) return <ErrorState />;

  if (reports.length === 0)
    return <p className="text-gray-500">No reports found.</p>;

  return (
    <div className="border rounded-xl divide-y overflow-hidden bg-white shadow-sm">
      {reports?.map((report: any) => (
        <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Flag className="w-4 h-4 text-red-500" />
              Report Reason: {report.reason}
            </h3>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(report.created_at).toLocaleString()}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {report.description}
          </p>

          <div className="text-sm text-gray-600 flex flex-col sm:flex-row sm:justify-between gap-1">
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              <span>
                <strong>Reporter ID:</strong> {report.reporter_id}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              <span>
                <strong>Reported ID:</strong> {report.reported_id}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
