"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";
import ErrorMessage from "@/components/reusable/ErrorMessage";
import SuccessModal from "@/components/reusable/SuccessModal";
import { privateAxios } from "@/lib/axios";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  subject: string;
  reason: string;
};

// api call
const useResheduleSession = (id: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await privateAxios.post(`/students/${id}/reschedule`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["studentSessions"],
      });
    },
  });
};

export default function RescheduleModal({ data, color }: any) {
  const { tutor, subject, id } = data;
  // handle modal
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  // handle form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: tutor || "",
      subject: subject || "",
      reason: "",
    },
  });

  // api
  const { mutate, isPending } = useResheduleSession(id);
  const onSubmit = (data: FormValues) => {
    console.log("Reschedule Request:", data + id);

    mutate(data, {
      onSuccess: () => {
        onClose();
        setIsSuccess(true);
      },
      onError: (error: any) => {
        console.log("Error", error);
      },
    });
  };
  return (
    <div>
      {color ? (
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white rounded-md hover:bg-purple-700 cursor-pointer"
        >
          Reschedule
        </button>
      ) : (
        <button
          onClick={onOpen}
          className="px-4 py-2 cursor-pointer bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Reschedule
        </button>
      )}

      <CustomDialog open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CustomInputField
            label="Name"
            name="name"
            placeholder="Your Name"
            register={register}
            errors={errors.name}
            required={true}
            readonly={true}
          />

          <CustomInputField
            label="Subject"
            name="subject"
            placeholder="Your Subject"
            register={register}
            errors={errors.subject}
            required={true}
            readonly={true}
          />

          <div>
            <label
              className="block text-sm font-medium text-[#374151]"
              htmlFor="message"
            >
              Please explain why you missed the class{" "}
              <span className="text-red-500/80">*</span>
            </label>

            <textarea
              className="mt-2 px-4 py-4 w-full border border-gray-300 rounded-lg  h-[177.33px]"
              id="reason"
              placeholder="Tell us how we can help you..."
              {...register("reason", {
                required: "Reason is required",
              })}
            />
            <ErrorMessage error={errors.reason} />
          </div>

          <button
            type="submit"
            className="py-4.5 text-center bg-gradient-to-l from-[#6366F1] to-[#A855F7] w-full rounded-xl text-white font-bold leading-6 cursor-pointer"
            disabled={isPending}
          >
            Send Message
          </button>
        </form>
      </CustomDialog>

       <SuccessModal
             open={isSuccess}
             setOpen={setIsSuccess}
             title="Reschedule Request Successful"
             message="Your request was submitted successfully. Please wait until the student accepts."
           />
    </div>
  );
}
