import { FieldValues, UseFormRegister, Controller, Control, Path } from "react-hook-form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";  
import ErrorMessage from "./ErrorMessage";  

// Define types for the props
interface SelectFieldProps<T extends FieldValues = FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T> | any;
  control: Control<T>;
  options: { label: string; value: string }[];
  required?: boolean; // Optional required field
  disabled?: boolean; // Optional disabled state
  placeholder?: string; // Optional custom placeholder
  onChange?: (value: string) => void; // Optional onChange callback
}

const CustomSelectField = <T extends FieldValues = FieldValues>({
  label,
  name,
  register,
  control,
  options,
  required = false,
  disabled = false,
  placeholder,
  onChange,
}: SelectFieldProps<T>) => {
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
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }} 
              value={field.value}
              disabled={disabled}
            >
              <SelectTrigger className="mt-2 px-4 py-6.5 w-full border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                <SelectValue placeholder={placeholder || `Select ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ErrorMessage error={fieldState.error} />
          </>
        )}
      />
    </div>
  );
};

export default CustomSelectField;
