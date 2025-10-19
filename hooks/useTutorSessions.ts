"use client";

import { createSession, getTeacherSessions, updateSession } from "@/api/tutor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

// Create new Session
export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Session created successfully!");
    },
    onError: (error: any) => {
      console.error("Create session error", error);
      toast.error("Something went wrong, please try again!");
    },
  });
}

// Get all teacher session
export function useGetTeacherSessions() {
  return useQuery({
    queryKey: ["sessions", ],
    queryFn: () => getTeacherSessions(),
    // enabled: !!, // ensures the query only runs when teacherId
  });
}


// Edit session
export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateSession(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("Session updated successfully!");
    },
    onError: () => toast.error("Failed to update session"),
  });
};
