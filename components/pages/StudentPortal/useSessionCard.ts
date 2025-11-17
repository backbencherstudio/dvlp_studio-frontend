import { privateAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export  const useCancelSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await privateAxios.patch(
        `/students/cancel-session/${sessionId}`
      );
      return res.data;
    },

    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Session Cancelled Successfully");

        // 🚀 This alone is enough
        queryClient.invalidateQueries({ queryKey: ["studentSessions"] });
      } else {
        toast.error(data?.message || "Failed to cancel session.");
      }
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    },
  });
};
