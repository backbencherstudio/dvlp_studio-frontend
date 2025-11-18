"use client";

import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";
import ErrorMessage from "@/components/reusable/ErrorMessage";
import { privateAxios, publicAxios } from "@/lib/axios";
import { parseApiError } from "@/lib/universalErrorHandler";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { full_name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: any) => {
    // console.log("Form Data Submited", data);
    try {
      const res = await publicAxios.post(
        "/help-and-support/support-message",
        data
      );
      if (res.data?.success) {
        toast.success("Submitted Successfully!");
        reset();
      } else {
        toast.error("Submission failed");
      }
    } catch (error: any) {
      toast.error(parseApiError(error));
    }
  };

  return (
    <div className="p-8 md:w-[576px] shadow-xs bg-white/80 border-white/50 backdrop-blur-[2px] rounded-3xl">
      <h3 className="text-3xl font-bold leading-9 mb-8">Send us a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        <CustomInputField
          label="Full Name"
          name="full_name"
          placeholder="Enter your full name"
          register={register}
          errors={errors.full_name}
          required={true}
        />
        <CustomInputField
          label="Email Address"
          name="email"
          placeholder="Enter Your Email"
          register={register}
          errors={errors.email}
          required={true}
        />
        <CustomInputField
          label="Subject"
          name="subject"
          placeholder="Enter Your Subject"
          register={register}
          errors={errors.subject}
          required={true}
        />

        <div>
          <label
            className="block text-sm font-medium text-[#374151]"
            htmlFor="message"
          >
            Message <span className="text-red-500/80">*</span>
          </label>

          <textarea
            className="mt-2 px-4 py-4 w-full border border-gray-300 rounded-lg  h-[177.33px] resize-none"
            id="message"
            placeholder="Tell us how we can help you..."
            {...register("message", {
              required: "Message is required",
            })}
          />
          <ErrorMessage error={errors.message} />
        </div>

        <button
          type="submit"
          className="py-4.5 text-center bg-gradient-to-l from-[#6366F1] to-[#A855F7] w-full rounded-xl text-white font-bold leading-6 cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
