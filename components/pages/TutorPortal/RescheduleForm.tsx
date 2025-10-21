"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import DatePickerField from "@/components/reusable/CustomDateInput";
import CustomInputField from "@/components/reusable/CustomInput";
import CustomTimePicker from "@/components/reusable/CustomTimePicker";
import { RescheduleRequestItem } from "./RescheduleRequest";
import { privateAxios } from "@/lib/axios";

interface RescheduleFormData {
  joinLink: string;
  date: string;
  time: string;
}

interface RescheduleFormProps {
  onClose: () => void;
  sessionInfo: RescheduleRequestItem;
  onSuccess: () => void;
}

export default function RescheduleForm({
  onClose,
  sessionInfo,
  onSuccess,
}: RescheduleFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<RescheduleFormData>({
    defaultValues: { joinLink: "", date: "", time: "" },
  });

  /* -----------------------------
      ✅ React Query Mutation
  ----------------------------- */
  /* -----------------------------
    ✅ React Query Mutation
----------------------------- */
  const mutation = useMutation({
    mutationFn: async (payload: {
      rescheduled_date: string;
      join_link: string;
    }) => {
      return await privateAxios.post(
        `/teacher/accept/${sessionInfo.id}/`,
        payload
      );
    },
    onSuccess: () => {
      toast.success("Reschedule request accepted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["rescheduleRequests"],
      }); // refetch list
      reset();
      onClose();
      onSuccess();
    },
    onError: (error: any) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to accept request.");
    },
  });
  /* -----------------------------
      ✅ Form Submit Handler
  ----------------------------- */
  const handleAcceptReschedule: SubmitHandler<RescheduleFormData> = (data) => {
    const transformedData = {
      rescheduled_date: `${data.date}T${data.time}:00Z`,
      join_link: data.joinLink,
    };
    mutation.mutate(transformedData);
  };

  /* -----------------------------
      ✅ UI
  ----------------------------- */
  return (
    <div className="border backdrop-blur-[2px] rounded-3xl border-solid border-[rgba(255,255,255,0.50)] bg-white p-6">
      <div>
        <h3 className="text-slate-800 font-inter text-2xl font-medium leading-9 mb-2">
          Reschedule Request
        </h3>
        <p className="text-[#4A4C56]">
          Please select a new time slot for your student’s session.
        </p>
      </div>

      <hr className="bg-[#DFE1E7] my-6" />

      <form
        onSubmit={handleSubmit(handleAcceptReschedule)}
        className="space-y-6"
      >
        {/* Session Info */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">
            {sessionInfo.username}
          </h3>
          <p className="text-lg font-medium leading-6 mb-2.5">
            {sessionInfo.subject}
          </p>
          <p className="text-[#6B7280]">
            Missed: <span>Aug 15, 2025, 4:00 PM</span>
          </p>
        </div>

        {/* Set new time */}
        <div>
          <p className="text-gray-700 text-sm font-medium mb-2">
            Set new time slot:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <DatePickerField
              name="date"
              register={register}
              control={control}
              required={true}
              placeholder="Select Date"
            />
            <CustomTimePicker
              name="time"
              register={register}
              control={control}
              required={true}
            />
          </div>
        </div>

        {/* Join link */}
        <div>
          <CustomInputField
            label="Join Link"
            name="joinLink"
            placeholder="Enter join link"
            register={register}
            errors={errors.joinLink}
            required={true}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full px-4 py-3 text-center font-medium bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-xl text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Processing..." : "Accept & Reschedule"}
        </button>
      </form>
    </div>
  );
}
