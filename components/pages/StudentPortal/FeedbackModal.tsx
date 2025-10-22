"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import CustomInputField from "@/components/reusable/CustomInput";
import ErrorMessage from "@/components/reusable/ErrorMessage";
import SuccessModal from "@/components/reusable/SuccessModal";
import { privateAxios } from "@/lib/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FeedbackFormValues {
  rating: number;
  name: string;
  comments: string;
}

export default function FeedbackModal({
  open,
  setOpen,
  sessionId,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  sessionId: string;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  // react hook form setup
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    defaultValues: { rating: 5, name: "", comments: "" },
  });

  const selectedRating = watch("rating");

  const onSubmit = async (data: FeedbackFormValues) => {
    try {
      await privateAxios.post(`/students/session/${sessionId}/feedback`, data);
      setOpen(false);
      setIsSuccess(true);
      reset();
    } catch (error: any) {
      console.error("Feedback Error:", error);
    }
  };

  return (
    <>
      {/* Modal */}
      <CustomDialog
        open={open}
        setOpen={(val: boolean) => {
          if (!val) reset();
          setOpen(val);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Share Your Feedback
          </h2>

          {/* Rating */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Rate your session <span className="text-red-500/80">*</span>
            </p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setValue("rating", num)}
                  className={`w-full h-10 rounded-lg border flex items-center justify-center text-sm font-medium transition ${
                    selectedRating === num
                      ? "border-purple-500 text-purple-600"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <CustomInputField
            label="Your Name"
            name="name"
            placeholder="Enter your name"
            register={register}
            errors={errors.name}
            required={true}
          />

          {/* Comments */}
          <div>
            <label
              className="block text-sm font-medium text-[#374151]"
              htmlFor="comments"
            >
              Comments <span className="text-red-500/80">*</span>
            </label>
            <textarea
              id="comments"
              className="mt-2 px-4 py-4 w-full border border-gray-300 rounded-lg h-[177px]"
              placeholder="Write your comments here..."
              {...register("comments", {
                required: "Comments are required",
              })}
            />
            <ErrorMessage error={errors.comments} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="py-4.5 text-center bg-gradient-to-l from-[#6366F1] to-[#A855F7] w-full rounded-xl text-white font-bold leading-6 cursor-pointer hover:opacity-90"
          >
            Submit Feedback
          </button>
        </form>
      </CustomDialog>

      {/* Success Modal */}
      <SuccessModal
        open={isSuccess}
        setOpen={setIsSuccess}
        title="Feedback Submitted!"
        message="Your feedback has been successfully recorded. Thank you for sharing your thoughts!"
      />
    </>
  );
}
