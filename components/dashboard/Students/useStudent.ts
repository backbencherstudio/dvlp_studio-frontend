import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/lib/axios";
import { toast } from "sonner";

const fetchStudents = async () => {
  const { data } = await privateAxios.get("/tutor/all");
  return data;
};

const fetchStudentById = async (id: string) => {
  const { data } = await privateAxios.get(`/tutor/application/${id}`);
  return data;
};

const deleteStudent = async (id: string) => {
  const { data } = await privateAxios.delete(`/tutor/acceptApp/${id}`);
  return data;
};

// ✅ Restrict a student/tutor with reason + period
const restrictStudent = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    restriction_period: string;
    restriction_reason: string;
  };
}) => {
  const { data } = await privateAxios.patch(`/student/restricted-user/${id}`, payload);
  return data;
};

const unRestrictStudent = async (id: string) => {
  const { data } = await privateAxios.patch(`/student/unrestrict-user/${id}`);
  return data;
}




/*---------------------------------
          ALL USEFUL HOOKS
-----------------------------------*/

// ✅ Fetch all applications
export const useStudents = () => {
  return useQuery({ queryKey: ["applications"], queryFn: fetchStudents });
};

// ✅ Fetch one application by ID
export const useStudentnDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchStudentById(id!),
    enabled: !!id,
  });
};

// --- Mutations Hook ---
export const useStudentsMutations = () => {
  const queryClient = useQueryClient();

  // ✅ Delete
  const deleteMut = useMutation({
    mutationFn: deleteStudent,
    onSuccess: (data) => {
      toast.success(data?.message || "Tutor deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (err: any) => {
      toast.error("Failed to delete tutor");
    },
  });

  // ✅ Restrict
  const restrictMut = useMutation({
    mutationFn: restrictStudent,
    onSuccess: (data) => {
      toast.success(data?.message || "Tutor restricted successfully!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (err: any) => {
      toast.error("Failed to restrict tutor");
    },
  });
  // ✅ UnRestrict
  const unRestrictMut = useMutation({
    mutationFn: unRestrictStudent ,
    onSuccess: (data) => {
      toast.success(data?.message || "Tutor Unrestricted successfully!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (err: any) => {
      toast.error("Failed to Unrestrict tutor");
    },
  });

  return { deleteMut, restrictMut, unRestrictMut };
};


export const transformStudentApiData = (apiData: any): any[] => {
  return apiData.map((item: any, index: number) => ({
    tutor_id: item.User_Id, // optional: assign a numeric session_id for popover logic    
    name: item.NAME,
    subject: item.SUBJECT,
    hourly_rate: `$${item.HOURLY_RATE}`,
    status: item.STATUS,
    location: item.LOCATION,
  }));
}