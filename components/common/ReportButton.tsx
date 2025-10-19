"use client";

import React, { useState } from "react";
import CustomDialog from "../reusable/CustomDialog";
import { useForm } from "react-hook-form";
import CustomSelectField from "../reusable/CustomSelect";
 // ✅ use default import if you exported default
import { Button } from "../ui/button";
import { CustomTextareaField } from "../reusable/CustomInput";

interface ReportFormValues {
  selectedReport: string;
  comments: string;
}

export default function ReportButton({ tutorId }: { tutorId: string | any }) {
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ReportFormValues>({
    defaultValues: { selectedReport: "", comments: "" },
  });

  // ✅ Define your submit function
  const onSubmit = (data: ReportFormValues) => {
    console.log("Report submitted:", { ...data, tutorId });
    // Here you can call your API or mutation, e.g.:
    // await reportTutor({ tutorId, ...data });
    setOpen(false);
  };

  return (
    <div>
      <p
        onClick={() => setOpen(true)}
        className="inline-block underline underline-offset-4 text-[#6B7280] cursor-pointer"
      >
        Report Tutor
      </p>

      <CustomDialog open={open} setOpen={setOpen}>
        <h2 className="text-2xl font-bold mb-5">Report Student</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CustomSelectField
            label="Why are you reporting this user?"
            name="selectedReport"
            register={register}
            control={control}
            options={[
              { label: "Inappropriate behavior", value: "inappropriate" },
              { label: "Spam or scam", value: "spam" },
              { label: "Harassment", value: "harassment" },
              { label: "Other", value: "other" },
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

          <Button type="submit" className="mt-2 w-full h-11">
            Submit Report
          </Button>
        </form>
      </CustomDialog>
    </div>
  );
}
