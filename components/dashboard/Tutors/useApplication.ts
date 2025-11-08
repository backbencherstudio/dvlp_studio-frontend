import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { privateAxios } from "@/lib/axios";
import { toast } from "sonner";

const fetchApplications = async () => {
  //   const { data } = await privateAxios.get("/tutor/applications");
  const { data } = await privateAxios.get("/tutor/applications");
  return data;
};

const fetchApplicationById = async (id: string) => {
  const { data } = await privateAxios.get(`/tutor/application/${id}`);
  return data;
};

const approveApplication = async (id: string) => {
  const { data } = await privateAxios.patch(`/tutor/acceptApp/${id}`);
  return data;
};

const restrictapplication = async (id: string) => {
  const { data } = await privateAxios.patch(`/tutor/rejectApp/${id}`);
  return data;
};

// ✅ Fetch all applications
export const useApplications = () => {
  return useQuery({  queryKey: ["tutor-applications"], queryFn: fetchApplications });
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

export const useTutorApplicationActions = () => {
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: approveApplication,
    onSuccess: (data) => {
      toast.success("Tutor approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["tutor-applications"] });
    },
    onError: (error: any) => {
      toast.error("Failed to approve tutor");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: restrictapplication,
    onSuccess: (data) => {
      toast.success("Tutor rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["tutor-applications"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to reject tutor");
    },
  });

  return { approveMutation, rejectMutation };
};

// method: 2
// export const useapplicationMutations = () => {
//   const queryClient = useQueryClient();

//   const approveMut = useMutation({
//     mutationFn: approveApplication,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }) ,
//   });

//   const restrictMut = useMutation({
//     mutationFn: restrictapplication,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
//   });

//   return { approveMut, restrictMut };
// };
