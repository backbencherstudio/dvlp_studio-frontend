"use client";

import CustomDialog from "@/components/reusable/CustomDialog";
import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";
import ErrorMessage from "@/components/reusable/ErrorMessage";
import SuccessModal from "@/components/reusable/SuccessModal";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  subject: string;
  reason: string;
};

export default function RescheduleModal() {
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
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Reschedule Request:", data);
    // send data to API

    setTimeout(() => {
      onClose();
      setIsSuccess(true);
    }, 1000);
  };
  return (
    <div>
      <button
        onClick={onOpen}
        className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white rounded-md hover:bg-purple-700 cursor-pointer"
      >
        Reschedule
      </button>

      <CustomDialog open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <CustomInputField
            label="Your Name"
            name="name"
            placeholder="Enter your full name"
            register={register}
            errors={errors.name}
            required={true}
          />

          <div>
            {/* Subject */}
            <CustomSelectField
              label="Subject"
              name="subject"
              register={register}
              control={control}
              options={[
                { label: "Math", value: "Math" },
                { label: "Science", value: "Science" },
              ]}
              required={true}
            />
          </div>
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
          >
            Send Message
          </button>
        </form>
      </CustomDialog>

   

      <SuccessModal
        open={isSuccess}
        setOpen={setIsSuccess}
        title="Payment Successful"
        message="Your session with Dr. Jessica Miller has been successfully booked."
      />
    </div>
  );
}
