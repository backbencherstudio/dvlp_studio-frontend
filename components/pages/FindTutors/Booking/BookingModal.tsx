"use client";
import React from "react";
import CustomDialog from "@/components/reusable/CustomDialog";
import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";

export default function BookingModal({
  open,
  onClose,
  onSubmit,
  form,
  subjects,
  slots,
  selectedSubject,
  setSelectedSubject,
  isSubmitting,
  error,
  tutorName,
}: any) {
  const { register, handleSubmit, control, formState } = form;

  return (
    <CustomDialog open={open} setOpen={onClose}>
      <h2 className="text-2xl font-semibold mb-4">
        Book Session with {tutorName}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInputField
          label="Your Name"
          name="name"
          placeholder="Enter your name"
          register={register}
          errors={formState.errors.name}
          required
          readonly
        />

        <CustomSelectField
          label="Subject"
          name="subject"
          register={register}
          control={control}
          options={subjects}
          onChange={(val: string) => setSelectedSubject(val)}
          required
          
        />

        <CustomSelectField
          label="Available Slots"
          name="slot"
          register={register}
          control={control}
          options={slots}
          required
          disabled={!selectedSubject}
          placeholder={
            selectedSubject ? "Select a time slot" : "First select a subject"
          }
        />

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-5 py-2 rounded-lg hover:opacity-80"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Booking..." : "Proceed to Payment"}
          </button>
          <button type="button" onClick={onClose} className="py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </CustomDialog>
  );
}
