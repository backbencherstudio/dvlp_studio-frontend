import { useFormContext } from "react-hook-form";
import { FormValues } from "./ApplyMultiStep";
import { SelectInput, TextArea, FormCheckbox } from "./InputHelpers";
import Link from "next/link";
import { toast } from "sonner";

/* ---------- Step 3: Final steps ---------- */
export function Step3({ serverMsg }: { serverMsg: string | null }) {
  const {
    watch,
    setValue,
    formState: { errors, isSubmitted },
  } = useFormContext<FormValues>();
  const docs = watch("documents");

  // Availability options
  const AVAILABILITY_OPTIONS = [
    { label: "Weekdays", value: "Weekdays" },
    { label: "Weekends", value: "Weekends" },
    { label: "Weeknights", value: "Weeknights" },
    { label: "Evenings", value: "Evenings" },
    { label: "Flexible", value: "Flexible" },
  ];

  return (
    <div className="space-y-5 w-full">
      {/* About */}
      <TextArea
        name="about"
        label="Tell us about yourself"
        placeholder="Describe your teaching philosophy, experience, and what makes you a great tutor…"
        rules={{
          required: "Tell us more",
          minLength: { value: 20, message: "Min 20 characters" },
        }}
      />

      {/* Availability */}
      <SelectInput
        name="availability"
        label="General Availability"
        placeholder="Select your availability"
        options={AVAILABILITY_OPTIONS}
        rules={{ required: "Availability is required" }}
      />

      {/* Documents */}
      <div className="rounded-2xl border border-dashed border-white/30 bg-white/5 p-4">
        <p className="mb-1 text-white font-medium">Document Upload</p>

        {/* 👇 Add this line here */}
        <p className="mb-3 text-xs text-white/60">
          (We are looking for: resume, transcript, teaching history)
        </p>

        <label
          htmlFor="documents"
          className="block cursor-pointer rounded-xl py-8 text-center text-white hover:bg-white/20"
        >
          Click to upload documents <br /> (PDF/DOC/DOCX up to 10MB)
          <input
            id="documents"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) =>
              setValue("documents", e.target.files ?? undefined, {
                shouldDirty: true,
              })
            }
          />
        </label>

        {docs && docs.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs text-white/80">
            {Array.from(docs).map((f) => (
              <li key={f.name}>• {f.name}</li>
            ))}
          </ul>
        )}

        {errors.documents && isSubmitted && (
          <p className="mt-2 text-xs text-red-300">
            Please upload at least one document
          </p>
        )}
      </div>

      {/* Required checkboxes */}
      <FormCheckbox
        name="consentBackground"
        label="I consent to a background check as part of the application process"
        rules={{ required: "You must consent to a background check" }}
        onToggle={(checked) => {
          if (checked) {
            toast.info(
              "You are fiscally responsible to pay for the background check, but it is inexpensive and will pay for itself after 1-2 sessions.",
              {
                position: "top-center", // 👈 this puts the toast in the center
                duration: 5000, // optional
              }
            );
          }
        }}
      />

      <FormCheckbox
        name="agreeTerms"
        label=<p className="text-white text-sm font-medium mb-2 block">
          I agree to the{" "}
          <Link className="underline" href="/privacy-policy/#terms-service">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={"/"} className="underline">
            Privacy Policy
          </Link>
        </p>
        rules={{ required: "You must agree to the terms and conditions" }}
      />

      {serverMsg && (
        <div className="rounded-xl border border-yellow-300/30 bg-yellow-500/10 p-2">
          <p className="text-sm  text-yellow-300 mb-1 text-center">
            {typeof serverMsg === "string"
              ? serverMsg
              : JSON.stringify(serverMsg)}
            !
          </p>
        </div>
      )}
    </div>
  );
}
