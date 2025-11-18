"use client";

import { privateAxios } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// ----------- Fetch Single Support -----------
const useOneSupport = (id: string) => {
  return useQuery({
    queryKey: ["support", id],
    queryFn: async () => {
      const res = await privateAxios.get(`/help-and-support/one-support/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

// ----------- Mutation to Toggle Status -----------
const useToggleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await privateAxios.patch(
        `/help-and-support/toggle-support-status/${id}`
      );
      return res.data;
    },

    onSuccess: (_, id) => {
      // Update the current page instantly
      queryClient.setQueryData(["support", id], (prev: any) => ({
        ...prev,
        status: prev?.status === "unsolved" ? "solved" : "unsolved",
      }));

      // Refresh messages list
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

// ----------- UI Component -----------
export default function EmailDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching, isError } = useOneSupport(id);
  const { mutate: toggleStatus, isPending } = useToggleStatus();

  if (isFetching)
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Failed to load support details.
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No details found.
      </div>
    );

  return (
    <div className="mx-auto mt-10 bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">{data.subject}</h2>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              data.status === "solved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {data.status}
          </span>

          <button
            onClick={() => toggleStatus(id)}
            disabled={isPending}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-60 cursor-pointer"
          >
            {isPending
              ? "Updating..."
              : data.status === "solved"
                ? "Mark as Solved"
                : "Mark as Unsolved"}
          </button>
        </div>
      </div>

      {/* User & Time */}
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

      {/* Message */}
      <div className="text-gray-800 text-sm">
        <h3 className="font-medium mb-1">Message:</h3>
        <p className="whitespace-pre-line">{data.message}</p>
      </div>
    </div>
  );
}
