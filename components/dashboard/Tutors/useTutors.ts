import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/lib/axios";
import { toast } from "sonner";

const fetchTeachers = async () => {
  const { data } = await privateAxios.get("/tutor/all");
  return data;
};

const fetchTeacherById = async (id: string) => {
  const { data } = await privateAxios.get(`/tutor/application/${id}`);
  return data;
};

const deleteTeacher = async (id: string) => {
  const { data } = await privateAxios.delete(`/student/${id}`);
  return data;
};

const restrictTeacher = async ({
  id,
  payload,
}: {
  id: string;
  payload: {
    restriction_period: string;
    restriction_reason: string;
  };
}) => {
  const { data } = await privateAxios.patch(
    `/student/restricted-user/${id}`,
    payload
  );
  return data;
};

/*---------------------------------
          ALL USEFUL HOOKS
-----------------------------------*/

// ✅ Fetch all applications
export const useTeachers = () => {
  return useQuery({ queryKey: ["applications"], queryFn: fetchTeachers });
};

// ✅ Fetch one application by ID
export const useTeachernDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchTeacherById(id!),
    enabled: !!id,
  });
};

// ✅ Delete / restrict mutations
export const useTeachersMutations = () => {
  const queryClient = useQueryClient();

  const deleteMut = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      toast.success("Teacher deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: any) => {
      toast.error("Failed to delete teacher");
    },
  });

  const restrictMut = useMutation({
    mutationFn: restrictTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Teacher restricted successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to restrict teacher");
    },
  });

  return { deleteMut, restrictMut };
};

//---------------- Helper function---------------
export const transformApiData = (apiData: any): any[] => {
  return apiData.map((item: any, index: number) => ({
    tutor_id: item.User_Id, // optional: assign a numeric session_id for popover logic
    name: item.NAME,
    subject: item.SUBJECT,
    hourly_rate: `$${item.HOURLY_RATE}`,
    status: item.STATUS,
    location: item.LOCATION,
  }));
};
