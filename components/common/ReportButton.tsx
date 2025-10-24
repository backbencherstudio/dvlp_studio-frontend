"use client";

import React, { useState } from "react";
import CustomDialog from "../reusable/CustomDialog";
import { useForm } from "react-hook-form";
import CustomSelectField from "../reusable/CustomSelect";
import { Button } from "../ui/button";
import { CustomTextareaField } from "../reusable/CustomInput";
import { privateAxios } from "@/lib/axios";
import { toast } from "sonner";

// ✅ Define your form type (matching form field names)
interface ReportFormValues {
  selectedReport: string;
  comments: string;
}

// ✅ API service function
export const reportTutor = async (
  tutorId: string,
  payload: { reason: string; description: string }
) => {
  const { data } = await privateAxios.post(
    `/extras/report/${tutorId}`,
    payload
  );
  return data;
};

export default function ReportButton({
  tutorId,
  userType,
}: {
  tutorId: string;
  userType?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<ReportFormValues>({
    defaultValues: { selectedReport: "", comments: "" },
  });

  // modal close
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  // ✅ Correctly map form values -> API payload
  const onSubmit = async (data: ReportFormValues) => {
    const payload = {
      reason: data.selectedReport, // map to API field
      description: data.comments, // map to API field
    };

    console.log("Report submitted:", { ...payload, tutorId });

    try {
      await reportTutor(tutorId, payload);
      toast.success("Report submitted successfully!");
      setOpen(false);
      reset();
    } catch (error: any) {
      console.error("Error reporting tutor:", error);
      toast.error(error.response?.data?.message || "Failed to submit report");
    } finally {
    }
  };

  return (
    <div>
      <p
        onClick={() => setOpen(true)}
        className="inline-block underline underline-offset-2 text-[#6B7280] cursor-pointer"
      >
        Report {userType}
      </p>

      <CustomDialog open={open} setOpen={handleClose}>
        <h2 className="text-2xl font-bold mb-5">Report {userType}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CustomSelectField
            label="Why are you reporting this user?"
            name="selectedReport"
            register={register}
            control={control}
            options={[
              {
                label: "Inappropriate behavior",
                value: "Inappropriate behavior",
              },
              { label: "Spam or scam", value: "Spam or scam" },
              { label: "Harassment", value: "Harassment" },
              { label: "Other", value: "Other" },
            ]}
            required
            onChange={(value: string) => setSelectedReport(value)}
          />

          <CustomTextareaField
            label="Additional Comments"
            name="comments"
            placeholder="Write your comments here..."
            register={register}
            errors={errors.comments}
            required
          />

          <Button type="submit" className=" flex justify-center items-center self-stretch
    bg-gradient-to-r from-[#6366F1] to-[#A855F7]
   
    rounded-xl w-full h-11 cursor-pointer">
            Submit Report
          </Button>
        </form>
      </CustomDialog>
    </div>
  );
}
