import { FieldValues, UseFormRegister, FieldError } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

// Define types for the props
interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues> | any;
  errors: FieldError | undefined;
  required?: boolean; // Optional required field
}

const CustomInputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  register,
  errors,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#374151]"
      >
        {label} {required && <span className="text-red-500/80">*</span>}
      </label>
      <input
        id={name}
        placeholder={placeholder}
        className="mt-2 px-4 py-4 w-full border border-gray-300 rounded-lg"
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
      />

      <ErrorMessage error={errors} />
    </div>
  );
};

export default CustomInputField;
