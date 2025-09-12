import { FieldValues, UseFormRegister, Controller, Control, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ClockIcon } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils"; // Utility for className merging in shadcn/ui

// Define types for the props
interface TimePickerFieldProps<T extends FieldValues = FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T> | any;
  control: Control<T>;
  required?: boolean; // Optional required field
}

const TimePickerField = <T extends FieldValues = FieldValues>({
  label,
  name,
  register,
  control,
  required = false,
}: TimePickerFieldProps<T>) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#374151]"
      >
        {label} {required && <span className="text-red-500/80">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
        }}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <input
                type="time"
                id={name}
                className={cn(
                  "mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
                {...field}
              />
              <ClockIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
            </div>
            <ErrorMessage error={fieldState.error} />
          </>
        )}
      />
    </div>
  );
};

export default TimePickerField;
