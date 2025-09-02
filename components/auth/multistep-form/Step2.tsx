import { useFormContext } from "react-hook-form";
import { FormValues } from "./ApplyMultiStep";
import { SelectInput, TextInput, FormCheckbox } from "./InputHelpers";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPinIcon } from "lucide-react";

/* ---------- Step 2: Professional details ---------- */
export function Step2() {
  const { watch, setValue, formState: { errors, isSubmitted }, register } = useFormContext<FormValues>();
  const subjects = watch("subjects") || [];

  const toggleSubject = (s: string) => {
    const next = subjects.includes(s)
      ? subjects.filter((x) => x !== s)
      : [...subjects, s];
    setValue("subjects", next, { shouldDirty: true, shouldValidate: true });
  };

  const SUBJECT_OPTIONS: string[] = ["Math", "Music", "Art", "History", "CS"];

  // Education level options
  const EDUCATION_OPTIONS = [
    { label: "High School", value: "High School" },
    { label: "Associate", value: "Associate" },
    { label: "Bachelor", value: "Bachelor" },
    { label: "Master", value: "Master" },
    { label: "PhD", value: "PhD" },
  ];

  // Experience options
  const EXPERIENCE_OPTIONS = [
    { label: "0-1 years", value: "0-1 years" },
    { label: "2-3 years", value: "2-3 years" },
    { label: "4-6 years", value: "4-6 years" },
    { label: "7+ years", value: "7+ years" },
  ];

  return (
    <div className="space-y-5">
      <SelectInput
        name="educationLevel"
        label="Highest Education Level"
        placeholder="Select your education level"
        options={EDUCATION_OPTIONS}
        rules={{ required: "Education level is required" }}
      />

      <SelectInput
        name="experience"
        label="Teaching Experience"
        placeholder="Select your experience"
        options={EXPERIENCE_OPTIONS}
        rules={{ required: "Experience is required" }}
      />

      {/* Subjects */}
      <div>
        <p className="mb-2 text-sm font-medium text-white">
          Subjects You Can Teach{" "}
          <span className="text-white/60">(Select all that apply)</span>
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SUBJECT_OPTIONS.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <Checkbox
                id={`subject-${s}`}
                checked={subjects.includes(s)}
                onCheckedChange={() => toggleSubject(s)}
                className="mt-1"
              />
              <label htmlFor={`subject-${s}`} className="text-sm text-white cursor-pointer">
                {s}
              </label>
            </div>
          ))}
        </div>
        {/* Hidden input to register validation for subjects */}
        <input
          type="hidden"
          {...register("subjects", {
            validate: (v) => (v && v.length > 0) || "Please select at least one subject",
          })}
        />
        
        {/* Error message for subjects (show on Next when validation runs) */}
        {errors.subjects && (
          <p className="mt-1 text-xs text-red-300">
            {errors.subjects.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInput
          name="hourlyRate"
          label="Desired Hourly Rate ($)"
          placeholder="e.g., 50"
          type="number"
          rules={{
            required: "Hourly rate is required",
            validate: (v) => v && +v > 0 || "Enter a positive number",
          }}
        />
        <TextInput
          name="location"
          label="Location/City"
          icon={<MapPinIcon />}
          placeholder="Your city"
          rules={{ required: "City is required" }}
        />
      </div>
    </div>
  );
}
