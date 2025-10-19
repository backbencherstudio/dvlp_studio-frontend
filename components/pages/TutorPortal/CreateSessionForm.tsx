"use client";

import DatePickerField from "@/components/reusable/CustomDateInput";
import CustomInputField from "@/components/reusable/CustomInput";
import CustomSelectField from "@/components/reusable/CustomSelect";
import CustomTimePicker from "@/components/reusable/CustomTimePicker";
import { useCreateSession, useUpdateSession } from "@/hooks/useTutorSessions";
import { privateAxios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

/* ================================
   Interfaces
================================ */
export interface CreateSessionFormData {
  session_type: string;
  subject: string;
  session_charge: string;
  mode: "Virtual" | "In_Person";
  join_link: string;
  available_slots_time_and_date: {
    date: string;
    time: string;
  }[];
}

interface SessionFormProps {
  onClose: () => void;
  session?: CreateSessionFormData & { id?: string }; // ✅ optional for edit
}

/* ================================
   API Mutations
================================ */

// create session
// const createSession = async (data: any) => {
//   const res = await privateAxios.post("/teacher/create-session", data);
//   return res.data;
// };

// update session
// const updateSession = async (data: any, id: string) => {
//   const res = await privateAxios.put(`/teacher/update-session/${id}`, data);
//   return res.data;
// };

// // hook: create
// const useCreateSession = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createSession,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["sessions"] });
//       toast.success("Session created successfully!");
//     },
//     onError: () => toast.error("Failed to create session"),
//   });
// };

// hook: update
// const useUpdateSession = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: any }) =>
//       updateSession(data, id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["sessions"] });
//       toast.success("Session updated successfully!");
//     },
//     onError: () => toast.error("Failed to update session"),
//   });
// };

/* ================================
   Component
================================ */
export default function SessionForm({ onClose, session }: SessionFormProps) {

  console.log("Session: ", session)
  const { register, handleSubmit, control, formState: { errors } } =
    useForm<CreateSessionFormData>({
      defaultValues: session
        ? {
            session_type: session.session_type,
            subject: session.subject,
            session_charge: session.session_charge,
            mode: session.mode,
            join_link: session.join_link,
            available_slots_time_and_date: session.available_slots_time_and_date,
          }
        : {
            session_type: "",
            subject: "",
            session_charge: "",
            mode: "In_Person",
            join_link: "",
            available_slots_time_and_date: [{ date: "", time: "" }],
          },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "available_slots_time_and_date",
  });

  const createSessionMutation = useCreateSession();
  const updateSessionMutation = useUpdateSession();

  /* --------------------------
     Submit Handler
  --------------------------- */
  const handleAcceptSession: SubmitHandler<CreateSessionFormData> = (data) => {
    const transformedData = {
      ...data,
      session_charge: data.session_charge.replace("$", ""),
      available_slots_time_and_date: data.available_slots_time_and_date
        .filter((slot) => slot.date && slot.time)
        .map((slot) => `${slot.date}T${slot.time}:00Z`),
    };

    if (session?.id) {
      // ✅ Edit mode
      updateSessionMutation.mutate({ id: session.id, data: transformedData });
    } else {
      // ✅ Create mode
      createSessionMutation.mutate(transformedData);
    }

    onClose();
  };

  /* --------------------------
     Add new time slot
  --------------------------- */
  const addTimeSlot = () => {
    append({ date: "", time: "" });
  };

  /* --------------------------
     Render
  --------------------------- */
  return (
    <div className="border backdrop-blur-[2px] rounded-3xl border-solid border-[#ffffff80]">
      <div className="mb-4">
        <h3 className="text-slate-800 text-2xl font-medium leading-5">
          {session ? "Edit Session" : "Create Session"}
        </h3>
      </div>

      <hr className="bg-[#DFE1E7] my-2" />

      <form onSubmit={handleSubmit(handleAcceptSession)} className="space-y-2">
        {/* Session Type */}
        <CustomSelectField
          label="Session Type"
          name="session_type"
          register={register}
          control={control}
          options={[
            { label: "New Session", value: "new_session" },
            { label: "Reschedule", value: "reschedule" },
          ]}
          required
        />

        {/* Subject */}
        <CustomInputField
          label="Subject"
          name="subject"
          placeholder="Enter Subject"
          register={register}
          errors={errors.subject}
          required
        />

        {/* Session Charge */}
        <CustomInputField
          label="Session Charge"
          name="session_charge"
          placeholder="$75"
          register={register}
          errors={errors.session_charge}
          required
        />

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
                defaultChecked={!session || session.mode === "In_Person"}
                className="mr-2 w-4 h-4"
              />
              In-person
            </label>
          </div>
        </div>

        {/* Available Slots */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Slots *
          </label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex grid-cols-2 gap-4 items-center justify-between"
              >
                <div className="flex-1">
                  <DatePickerField
                    name={`available_slots_time_and_date.${index}.date`}
                    register={register}
                    control={control}
                    required
                    placeholder="Select Date"
                  />
                </div>

                <div className="flex-1">
                  <CustomTimePicker
                    name={`available_slots_time_and_date.${index}.time`}
                    register={register}
                    control={control}
                    required
                  />
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="pr-2 text-red-500 hover:text-red-700 mt-2 text-lg"
                  >
                    ×
                  </button>
                )}
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
        <CustomInputField
          label="Join Link"
          name="join_link"
          placeholder="dummyshortcut.link/session12"
          register={register}
          errors={errors.join_link}
          required
        />

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
            {session ? "Update Session" : "Create Session"}
          </button>
        </div>
      </form>
    </div>
  );
}
