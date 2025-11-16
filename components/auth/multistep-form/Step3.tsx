import { useFormContext } from "react-hook-form";
import { FormValues } from "./ApplyMultiStep";
import { SelectInput, TextArea, FormCheckbox } from "./InputHelpers";

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
        <p className="mb-2 text-white font-medium">Document Upload</p>
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

        {/* Error message for documents */}
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
      />

      <FormCheckbox
        name="agreeTerms"
        label="I agree to the Terms of Service and Privacy Policy"
        rules={{ required: "You must agree to the terms and conditions" }}
      />

      {serverMsg && (
        <div className="rounded-xl border border-yellow-300/30 bg-yellow-500/10 p-2">
          <p className="text-sm  text-yellow-300 mb-1 text-center">
            {typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg)}!
          </p>
        </div>
      )}
    </div>
  );
}
