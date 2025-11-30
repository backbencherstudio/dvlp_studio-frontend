import { FieldValues, UseFormRegister, FieldError } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

// Define types for the props
interface InputFieldProps {
  label?: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues> | any;
  errors: FieldError | undefined;
  required?: boolean; // Optional required field
  readonly?: boolean;
}

const CustomInputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  register,
  errors,
  required = false,
  readonly = false,
  
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#374151]"
        >
          {label} {required && <span className="text-red-500/80">*</span>}
        </label>
      )}
      <input
        id={name}
        placeholder={placeholder}
        className="mt-2 px-4 py-4 w-full border border-gray-300 rounded-lg "
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        readOnly={readonly}
        
      />

      <ErrorMessage error={errors} />
    </div>
  );
};

export default CustomInputField;



interface TextareaFieldProps {
  label?: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues> | any;
  errors: FieldError | undefined;
  required?: boolean;
  readonly?: boolean;
  rows?: number;
}

export const CustomTextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  placeholder,
  register,
  errors,
  required = false,
  readonly = false,
  rows = 4,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-[#374151]"
        >
          {label} {required && <span className="text-red-500/80">*</span>}
        </label>
      )}

      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 px-4 py-4 w-full border border-gray-300 rounded-lg resize-none"
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        readOnly={readonly}
      />

      <ErrorMessage error={errors} />
    </div>
  );
};



