import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { privateAxios } from "@/lib/axios";

const fetchSessions = async () => {
  const { data } = await privateAxios.get("/sessions/all-sessions");
  return data;
};

const fetchSessionById = async (id: string) => {
  const { data } = await privateAxios.get(`/teacher/session/${id}`);
  return data;
};

const deleteSession = async (id: string) => {
  const { data } = await privateAxios.delete(`/sessions/delete/${id}`);
  return data;
};

const restrictSession = async (id: string) => {
  const { data } = await privateAxios.patch(`/sessions/restrict-session/${id}`);
  return data;
};
const unRestrictSession = async (id: string) => {
  const { data } = await privateAxios.patch(`/sessions/unrestrict-session/${id}`);
  return data;
};

// ✅ Fetch all sessions
export const useSessions = () => {
  return useQuery({ queryKey: ["sessions"], queryFn: fetchSessions });
};

// ✅ Fetch one session by ID
export const useSessionDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => fetchSessionById(id!),
    enabled: !!id,
  });
};

// ✅ Delete / restrict mutations
export const useSessionMutations = () => {
  const queryClient = useQueryClient();

  const deleteMut = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
  });

  const restrictMut = useMutation({
    mutationFn: restrictSession,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
  });

  const unRestrictMut = useMutation({
    mutationFn: unRestrictSession,
     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
  })

  return { deleteMut, restrictMut, unRestrictMut };
};
