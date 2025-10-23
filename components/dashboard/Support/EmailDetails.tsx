"use client";

import { privateAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

// ✅ React Query Hook
const useOneSupport = (id: string) => {
  return useQuery({
    queryKey: ["support", id],
    queryFn: async () => {
      const { data } = await privateAxios.get(
        `/help-and-support/one-support/${id}`
      );
      return data?.data; // assuming response shape: { data: { ... } }
    },
    enabled: !!id,
  });
};
// mutaion for update

const useMarkAsSolved = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await privateAxios.patch(
        `/help-and-support/toggle-support-status/${id}`
      );
      return data;
    },
    onSuccess: (_, id) => {
      // update the cached data instantly
      queryClient.setQueryData(["support", id], (oldData: any) => ({
        ...oldData,
        status: "solved",
      }));
    },
  });
};

// ✅ Component
export default function EmailDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching, isError } = useOneSupport(id);
  const { mutate: markAsSolved, isPending } = useMarkAsSolved();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Failed to load support details.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No details found.</p>
      </div>
    );
  }

  // ✅ Card UI
  return (
    <div className="mx-auto mt-10 bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">{data.subject}</h2>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              data.status === "solved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {data.status}
          </span>

          {data.status !== "solved" && (
            <button
              onClick={() => markAsSolved(id)}
              disabled={isPending}
              className="px-3 py-1 text-sm bg-blue-500/95 text-white rounded-md hover:bg-blue-500 disabled:opacity-60  cursor-pointer"
            >
              {isPending ? "Updating..." : "Mark as Solved"}

            </button>
          )}
        </div>
      </div>

      <div className="text-gray-700 text-sm space-y-1">
        <p>
          <span className="font-medium">Name:</span> {data.full_name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {data.email}
        </p>
        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(data.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="text-gray-800 text-sm">
        <h3 className="font-medium mb-1">Message:</h3>
        <p className="whitespace-pre-line">{data.message}</p>
      </div>
    </div>
  );
}
