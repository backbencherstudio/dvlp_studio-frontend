import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { privateAxios } from "@/lib/axios";

const fetchApplications = async () => {
//   const { data } = await privateAxios.get("/tutor/applications");
  const { data } = await privateAxios.get("/tutor/all");
  return data;
};

const fetchApplicationById = async (id: string) => {
  const { data } = await privateAxios.get(`/tutor/application/${id}`);
  return data;
};

const approveApplication = async (id: string) => {
  const { data } = await privateAxios.delete(`/tutor/acceptApp/${id}`);
  return data;
};

const restrictapplication = async (id: string) => {
  const { data } = await privateAxios.patch(`/tutor/rejectApp/${id}`);
  return data;
};

// ✅ Fetch all applications
export const useapplications = () => {
  return useQuery({ queryKey: ["applications"], queryFn: fetchApplications });
};

// ✅ Fetch one application by ID
export const useapplicationDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchApplicationById(id!),
    enabled: !!id,
  });
};

// ✅ Delete / restrict mutations
export const useapplicationMutations = () => {
  const queryClient = useQueryClient();

  const deleteMut = useMutation({
    mutationFn: approveApplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

  const restrictMut = useMutation({
    mutationFn: restrictapplication,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

  return { deleteMut, restrictMut };
};
