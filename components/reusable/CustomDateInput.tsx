"use client"

import { FieldValues, UseFormRegister, Controller, Control, Path } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar"; // Assuming shadcn/ui calendar component
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils"; // Utility for className merging in shadcn/ui
import { useState } from "react"; // Import useState for controlling popover state

// Define types for the props
interface DatePickerFieldProps<T extends FieldValues = FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T> | any;
  control: Control<T>;
  required?: boolean; // Optional required field
}

const DatePickerField = <T extends FieldValues = FieldValues>({
  label,
  name,
  register,
  control,
  required = false,
}: DatePickerFieldProps<T>) => {
  // State to control the popover visibility
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "mt-2 px-4 py-6.5 w-full border border-gray-300 rounded-lg text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                    setIsPopoverOpen(false); // Close the popover after date is selected
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <ErrorMessage error={fieldState.error} />
          </>
        )}
      />
    </div>
  );
};

export default DatePickerField;
