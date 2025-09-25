"use client";

import DatePickerField from "@/components/reusable/CustomDateInput";
import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";
import TimePickerField from "@/components/reusable/CustomTimeInput";
import CustomTimePicker from "@/components/reusable/CustomTimePicker";
import { privateAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

interface CreateSessionFormData {
  session_type: string;
  subject: string;
  session_charge: string;
  mode: "Virtual" | "In_Person";
  join_link: string;
  available_slots: {
    date: string;
    time: string;
  }[];
}

interface CreateSessionFormProps {
  onClose: () => void;
}

const createSession = async (data:any) => {
  const res = await privateAxios.post("/teacher/create-session", data);
  return res.data;
};

export default function CreateSessionForm({ onClose }: CreateSessionFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateSessionFormData>({
    defaultValues: {
      session_type: "",
      subject: "",
      session_charge: "",
      mode: "In_Person",
      join_link: "",
      available_slots: [{ date: "", time: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "available_slots",
  });

  // mutation for api call
  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
      console.log(("Sucess"));
    },
    onError: (error: any) => {
        console.log("Create session  Error", error)
    }
  });



  //   handle submit
  const handleAcceptCreateSession: SubmitHandler<CreateSessionFormData> = (
    data
  ) => {
    // Transform the data to match the required structure
    const transformedData = {
      session_type: data.session_type,
      subject: data.subject,
      session_charge: data.session_charge.replace("$", ""), // Remove $ sign
      mode: data.mode,
      join_link: data.join_link,
      available_slots_time_and_date: data.available_slots
        .filter((slot) => slot.date && slot.time)
        .map((slot) => {
          // Combine date and time into ISO string
          const dateTimeString = `${slot.date}T${slot.time}:00Z`;
          return dateTimeString;
        }),
    };

    console.log("Form Data:", transformedData);

    mutation.mutate(transformedData);
    // Handle form submission logic here (e.g., API call, updating state, etc.)

 

    onClose();
  };

  const addTimeSlot = () => {
    append({ date: "", time: "" });
  };

  return (
    <div className="border backdrop-blur-[2px] rounded-3xl border-solid border-[rgba(255,255,255,0.50)] ">
      <div className="mb-6">
        <h3 className="text-slate-800 [font-family:Inter] text-2xl font-medium leading-9 ">
          Create Session
        </h3>
        {/* <p className="text-[#4A4C56]">
          Please create session slots for your students.
        </p> */}
      </div>

      <hr className="bg-[#DFE1E7] my-2" />

      <form
        onSubmit={handleSubmit(handleAcceptCreateSession)}
        className="space-y-4"
      >
        {/* Session Type */}
        <div></div>
        <div>
          <CustomSelectField
            label="Session Type"
            name="session_type"
            register={register}
            control={control}
            options={[
              { label: "New Session", value: "new_session" },
              { label: "Reschedule", value: "reschedule" },
            ]}
            required={true}
          />
        </div>

        <div>
          <CustomInputField
            label="Subject"
            name="subject"
            placeholder="Enter Subject"
            register={register}
            errors={errors.subject}
            required={true}
          />
        </div>
        {/* Session Charge */}
        <div>
          <CustomInputField
            label="Session Charge "
            name="session_charge"
            placeholder="$75"
            register={register}
            errors={errors.session_charge}
            required={true}
          />
        </div>

        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mode *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center border w-1/2 rounded-md py-2 px-3">
              <input
                type="radio"
                {...register("mode", { required: "Mode is required" })}
                value="Virtual"
                className="mr-2 w-4 h-4"
              />
              Virtual
            </label>
            <label className="flex items-center border w-1/2 rounded-md py-2 px-3">
              <input
                type="radio"
                {...register("mode", { required: "Mode is required" })}
                value="In_Person"
                defaultChecked
                className="mr-2 w-4 h-4"
              />
              In-person
            </label>
          </div>
          {/* {errors.mode && (
            <p className="text-red-500 text-sm mt-1">{errors.mode.message}</p>
          )} */}
        </div>

        {/* Available Slots */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Slots *
          </label>
          <div className="space-y-2 ">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex grid-cols-2 gap-4 items-center justify-between"
              >
                <div className="flex-1">
                  <DatePickerField
                    name={`available_slots.${index}.date`}
                    register={register}
                    control={control}
                    required={true}
                    placeholder="Select Date"
                  />
                </div>

                <div className="flex-1 ">
                  <div className="w-full">
                    <CustomTimePicker
                      // label="Time"
                      name={`available_slots.${index}.time`}
                      register={register}
                      control={control}
                      required={true}
                    />
                  </div>

                  {/* <input
                    type="time"
                    {...register(`available_slots.${index}.time`, {
                      required: "Time is required",
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  /> */}
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="pr-2 text-red-500 hover:text-red-700 mt-2 text-lg "
                  >
                    ×
                  </button>
                )}

                {/* {errors.available_slots?.[index]?.date && (
                  <p className="text-red-500 text-sm col-span-2">
                    {errors.available_slots[index]?.date?.message}
                  </p>
                )}
                {errors.available_slots?.[index]?.time && (
                  <p className="text-red-500 text-sm col-span-2">
                    {errors.available_slots[index]?.time?.message}
                  </p>
                )} */}
              </div>
            ))}

            <button
              type="button"
              onClick={addTimeSlot}
              className="flex items-center text-[#6366F1] hover:text-[#A855F7]"
            >
              <span className="mr-2">+</span>
              Add More Slots
            </button>
          </div>
        </div>

        {/* Join Link */}
        <div>
          <CustomInputField
            label="Join Link"
            name="join_link"
            placeholder="dummyshortcut.link/session12"
            register={register}
            errors={errors.join_link}
            required={true}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 text-center font-medium border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 text-center font-medium bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-xl text-white hover:opacity-90"
          >
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
}
