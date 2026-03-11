"use client";

import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  FieldErrors,
} from "react-hook-form";
import Step1 from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { publicAxios } from "@/lib/axios";
import { toast } from "sonner";

export type FormValues = {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;

  // Step 2
  educationLevel: string;
  gradeLevel: string;
  experience: string;
  subjects: string[]; // multi-select
  hourlyRate: string; // keep string for easier input
  location: string;

  // Step 3
  about: string;
  availability: string;
  documents?: FileList; // file upload
  consentBackground: boolean;
  agreeTerms: boolean;
};

const STEP_FIELDS: (keyof FormValues)[][] = [
  ["firstName", "lastName", "email", "phone", "password", "confirmPassword"],
  ["educationLevel", "gradeLevel","experience", "subjects", "hourlyRate", "location"],
  ["about", "availability", "documents", "consentBackground", "agreeTerms"],
];

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Languages",
  "Computer Science",
  "Art",
  "Music",
  "Test Prep",
];

export default function ApplyMultiStep() {
  const methods = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      // step 1
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      // step 2
      educationLevel: "",
      gradeLevel: "",
      experience: "",
      subjects:  [
        "Mathematics",
        "English",
        "Test Prep",
        "History",
        "Languages",
        "Science",
      ],
      hourlyRate: "",
      location: "",
      // step 3
      about: "",
      availability: "",
      documents: undefined,
      consentBackground: false,
      agreeTerms: false,
    },
  });

  const [serverMessage, setServerMessage] = React.useState<string | null>(null);
  const [step, setStep] = React.useState(0);
  const [customErrors, setCustomErrors] = React.useState<string[]>([]);
  const total = 3;

  const next = async () => {
    const ok = await methods.trigger(STEP_FIELDS[step], { shouldFocus: true });
    if (ok) {
      setStep((s) => Math.min(s + 1, total - 1));
      setCustomErrors([]); // Clear custom errors when moving to next step
    }
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    setCustomErrors([]); // Clear custom errors when going back
  };

  const onSubmit = async (data: FormValues) => {
    // Custom validation for fields that don't use standard react-hook-form validation
    const customErrors: string[] = [];

    // Validate subjects
    if (!data.subjects || data.subjects.length === 0) {
      customErrors.push("Please select at least one subject");
    }

    // Validate documents
    if (!data.documents || data.documents.length === 0) {
      customErrors.push("Please upload at least one document");
    }

    // Validate consent
    if (!data.consentBackground) {
      customErrors.push("You must consent to a background check");
    }

    // Validate terms agreement
    if (!data.agreeTerms) {
      customErrors.push("You must agree to the terms and conditions");
    }

    // If there are custom validation errors, set them and don't submit
    if (customErrors.length > 0) {
      setCustomErrors(customErrors);
      return;
    }

    // Clear any previous custom errors
    setCustomErrors([]);

    // Build FormData (handles files)
    // const fd = new FormData();
    // Object.entries(data).forEach(([k, v]) => {
    //   if (k === "documents" && v instanceof FileList) {
    //     Array.from(v).forEach((f) => fd.append("documents", f));
    //   } else if (Array.isArray(v)) {
    //     v.forEach((item) => fd.append(`${k}[]`, String(item)));
    //   } else {
    //     fd.append(k, String(v));
    //   }
    // });

    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone);
    formData.append("password", data.password);
    formData.append("type", "teacher");
    // formData.append('avatar', data.avatar);
    // formData.append('certifications', data.documents);
    formData.append("highest_education_level", data.educationLevel);
    formData.append("grades_taught", data.gradeLevel);
    formData.append("teching_experience", data.experience);
    formData.append("subjects_taught", JSON.stringify(data.subjects)); // Ensure it's a stringified array
    formData.append("hourly_rate", data.hourlyRate);
    formData.append("city", data.location);
    formData.append("about_me", data.about);
    formData.append("general_availability", data.availability);
    formData.append("is_agreed_terms", String(data.agreeTerms));
    formData.append(
      "is_agree_application_process",
      String(data.consentBackground)
    );
    // Example:
    // await fetch("/api/apply", { method: "POST", body: fd });
    console.log("FINAL payload (FormData shown as plain):", data);

    try {
      const res = await publicAxios.post("/auth/register", formData);
      console.log("Signup", res);
      const msg =
        res?.data?.message ?? "Registration successful. Check your email.";
      setServerMessage(msg);
      // toast.success(msg);
      setStep(total - 1);
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      // toast.error(errMsg);
      setServerMessage(errMsg);
    }
  };

  // console.log("server msg", serverMessage);

  return (
    <div>
      {/* Progress indicator */}
      <div className="flex gap-4 items-center justify-center mb-8">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex items-center justify-center gap-2">
            <div
              className={`flex w-8 h-8 justify-center items-center rounded-full ${
                step >= i
                  ? "[background:linear-gradient(90deg,#10B981_0%,#14B8A6_100%)] text-white"
                  : "[background:rgba(255,255,255,0.20)] text-[#9CA3AF]"
              }`}
            >
              {i + 1}
            </div>
            {i === 0 && (
              <div
                className={`w-8 h-1 rounded ${
                  step >= 1
                    ? "[background:linear-gradient(90deg,#10B981_0%,#14B8A6_100%)]"
                    : "[background:rgba(255,255,255,0.20)]"
                }`}
              />
            )}
            {i === 1 && (
              <div
                className={`w-8 h-1 rounded ${
                  step >= 2
                    ? "[background:linear-gradient(90deg,#10B981_0%,#14B8A6_100%)]"
                    : "[background:rgba(255,255,255,0.20)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form section */}
      <section className="border [background:rgba(255,255,255,0.10)] backdrop-blur-[5px] rounded-3xl border-solid border-[rgba(255,255,255,0.20)] mt-8 p-8 md:w-[448px] w-[380px]">
        {/* header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            {step === 0 && "Share Your Knowledge!"}
            {step === 1 && "Professional Details"}
            {step === 2 && "Final Steps"}
          </h1>
          <p className="text-sm text-white/80">
            Step {step + 1} of {total}
          </p>
        </header>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            {step === 0 && <Step1 />}
            {step === 1 && <Step2 />}
            {step === 2 && <Step3 serverMsg={serverMessage} />}

            {/* Custom validation errors display */}
            {customErrors.length > 0 && (
              <div className="rounded-xl border border-red-300/30 bg-red-500/10 p-4">
                <p className="text-sm font-medium text-red-300 mb-2">
                  Please fix the following errors:
                </p>
                <ul className="space-y-1">
                  {customErrors.map((error, index) => (
                    <li key={index} className="text-xs text-red-300">
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="w-1/3 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white"
                >
                  Previous
                </button>
              )}
              {step < total - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 font-semibold text-white"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {methods.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </section>
    </div>
  );
}
