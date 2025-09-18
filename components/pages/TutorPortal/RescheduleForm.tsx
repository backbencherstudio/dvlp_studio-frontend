import DatePickerField from "@/components/reusable/CustomDateInput";
import CustomInputField from "@/components/reusable/CustomInput";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface RescheduleFormData {
  joinLink: string;
  date: string;
  time: string;
}

interface RescheduleFormProps {
  onClose: () => void;
}

export default function RescheduleForm({ onClose }: RescheduleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RescheduleFormData>({
    defaultValues: { joinLink: "", date: "", time: "" },
  });

  const handleAcceptReschedule: SubmitHandler<RescheduleFormData> = (data) => {
    console.log("Form Data:", data);
    // Handle form submission logic here (e.g., API call, updating state, etc.)
    onClose();
  };

  return (
    <div className="border backdrop-blur-[2px] rounded-3xl border-solid border-[rgba(255,255,255,0.50)]">
      <div>
        <h3 className="text-slate-800 [font-family:Inter] text-2xl font-medium leading-9 mb-2">
          Reschedule Requests
        </h3>
        <p className="text-[#4A4C56]">
          Please request reschedule slots for your students.
        </p>
      </div>

      <hr className="bg-[#DFE1E7] my-6" />

      <div>
        {/* info */}
        <form
          onSubmit={handleSubmit(handleAcceptReschedule)}
          className="space-y-6"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-3">Sophia Johnson</h3>
            <p className="text-lg font-medium leading-6 mb-2.5">Calculus</p>
            <p className="text-[#6B7280]">
              Missed: <span> Aug 15, 2025, 4:00 PM</span>{" "}
            </p>
          </div>
          {/* set new time */}
          <div>
            <p className="text-gray-700 text-sm font-medium">
              Set new time slots:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <DatePickerField
                name="date"
                register={register}
                control={control}
                required={true}
                placeholder="Select Date"
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

          <button
            type="submit"
            className="w-full px-4 py-3 text-center font-medium bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-xl text-white"
          >
            Accept & Reschedule
          </button>
        </form>
      </div>
    </div>
  );
}
