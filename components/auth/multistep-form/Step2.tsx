import { useFormContext } from "react-hook-form";
import { FormValues } from "./ApplyMultiStep";
import { SelectInput, TextInput } from "./InputHelpers";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPinIcon } from "lucide-react";
import { useEffect } from "react";

/* ---------- Step 2: Professional details ---------- */
export function Step2() {
  const {
    watch,
    setValue,
    formState: { errors },
    register,
  } = useFormContext<FormValues>();
  
  const subjects = watch("subjects") || [];
  const city = watch("city");
  const state = watch("state");

  // Sync city + state to location field for backend compatibility
  useEffect(() => {
    if (city && state) {
      setValue("location", `${city}, ${state}`, { shouldDirty: true });
    } else if (city) {
      setValue("location", city, { shouldDirty: true });
    } else if (state) {
      setValue("location", state, { shouldDirty: true });
    } else {
      setValue("location", "", { shouldDirty: true });
    }
  }, [city, state, setValue]);

  const toggleSubject = (s: string) => {
    const next = subjects.includes(s)
      ? subjects.filter((x) => x !== s)
      : [...subjects, s];
    setValue("subjects", next, { shouldDirty: true, shouldValidate: true });
  };

  const SUBJECT_OPTIONS: string[] = [
    "Mathematics",
    "English",
    "Test Prep",
    "History",
    "Languages",
    "Science",
  ];

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

  // Grade options
  const GRADE_OPTIONS = [
    { label: "Grade k5", value: "k5" },
    { label: "Grade 6-8", value: "6-8" },
    { label: "Grade 8-12", value: "8-12" },
  ];

  // US State options
  const US_STATE_OPTIONS = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
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

      <SelectInput
        name="gradeLevel"
        label="Grade Level"
        placeholder="Select your Grade"
        options={GRADE_OPTIONS}
        rules={{ required: "Grade level is required" }}
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
              <label
                htmlFor={`subject-${s}`}
                className="text-sm text-white cursor-pointer"
              >
                {s}
              </label>
            </div>
          ))}
        </div>
        
        {/* Hidden input to register validation for subjects */}
        <input
          type="hidden"
          {...register("subjects", {
            validate: (v) =>
              (v && v.length > 0) || "Please select at least one subject",
          })}
        />

        {/* Error message for subjects */}
        {errors.subjects && (
          <p className="mt-1 text-xs text-red-300">
            {errors.subjects.message as string}
          </p>
        )}
      </div>

      <TextInput
        name="hourlyRate"
        label="Desired Hourly Rate ($)"
        placeholder="e.g., 50"
        type="number"
        rules={{
          required: "Hourly rate is required",
          validate: (v) => (v && +v > 0) || "Enter a positive number",
        }}
      />

      {/* City and State fields (V2 UI) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInput
          name="city"
          label="City"
          icon={<MapPinIcon />}
          placeholder="Your city"
          rules={{ required: "City is required" }}
        />
        <SelectInput
          name="state"
          label="State"
          placeholder="Select your state"
          options={US_STATE_OPTIONS}
          rules={{ required: "State is required" }}
        />
      </div>

      {/* Hidden location field for backend compatibility (V1) */}
      <input type="hidden" {...register("location")} />
      
      {/* Optional: Show combined location for preview */}
      {/* {city && state && (
        <p className="text-xs text-white/50 mt-2">
          Location will be saved as: {city}, {state}
        </p>
      )} */}
    </div>
  );
}