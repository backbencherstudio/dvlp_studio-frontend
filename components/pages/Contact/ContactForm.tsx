"use client";

import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";
import ErrorMessage from "@/components/reusable/ErrorMessage";
import React from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { fullName: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data Submited", data);
  };
  1;
  return (
    <div className="p-8 md:w-[576px] shadow-xs bg-white/80 border-white/50 backdrop-blur-[2px] rounded-3xl">
      <h3 className="text-3xl font-bold leading-9 mb-8">Send us a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
        <CustomInputField
          label="Full Name"
          name="fullName"
          placeholder="Enter your full name"
          register={register}
          errors={errors.fullName}
          required={true}
        />
        <CustomInputField
          label="Email Address"
          name="email"
          placeholder="Enter "
          register={register}
          errors={errors.email}
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
            Message <span className="text-red-500/80">*</span>
          </label>

          <textarea
            className="mt-2 px-4 py-4 w-full border border-gray-300 rounded-lg  h-[177.33px]"
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
