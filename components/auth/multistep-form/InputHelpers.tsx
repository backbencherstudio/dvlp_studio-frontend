import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { FormValues } from "./ApplyMultiStep";
import AuthInput from "@/components/reusable/AuthInput";
import { AuthSelect } from "@/components/reusable/AuthSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPhoneNumber } from "@/lib/formatePhoneNumber";

// text input
type TextInputProps = {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  type?: string;
  rules?: RegisterOptions<FormValues, keyof FormValues>;
  icon?: React.ReactNode;
};

function TextInput({
  name,
  label,
  placeholder,
  type = "text",
  rules,
  icon,
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <AuthInput
        type={type}
        placeholder={placeholder}
        icon={icon}
        {...register(name, rules)}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-300">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

// select input
type SelectInputProps = {
  name: keyof FormValues ;
  label: string;
  placeholder?: string;
  rules?: RegisterOptions<FormValues, keyof FormValues>;
  options: { label: string; value: string }[];
};

function SelectInput({
  name,
  label,
  placeholder,
  options,
  rules,
}: SelectInputProps) {
  const {
    watch,
    setValue,
    formState: { errors },
    register,
  } = useFormContext<FormValues>();
  const currentValue = watch(name);
  const { control } = useFormContext<FormValues>();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => {
          const val = typeof field.value === "string" ? field.value : "";

          return (
            <>
              <AuthSelect
                placeholder={placeholder}
                options={options}
                value={val}
                onValueChange={(v: string) => field.onChange(v)}
                isInvalid={!!fieldState.error}
              />
              {fieldState.error && (
                <p className="mt-1 text-xs text-red-300">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

// textarea
type TextAreaProps = {
  name: keyof FormValues;
  label: string;
  placeholder?: string;
  rows?: number;
  rules?: RegisterOptions<FormValues, keyof FormValues>;
};

function TextArea({
  name,
  label,
  placeholder,
  rows = 4,
  rules,
}: TextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <textarea
        {...register(name, rules)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none"
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-300">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

// checkbox using shadcn
type CheckboxProps = {
  name: keyof FormValues;
  label: string | any;
  rules?: RegisterOptions<FormValues, keyof FormValues>;
};

function FormCheckbox({ name, label, rules, onToggle }: CheckboxProps & {
  onToggle?: (checked: boolean) => void;
}) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<FormValues>();

  const isChecked = watch(name) as boolean;

  return (
    <div>
      <div className="flex items-start gap-3">
        <Checkbox
          id={name}
          checked={isChecked}
          onCheckedChange={(checked) => {
            setValue(name, checked as boolean, { shouldDirty: true });

            // 🔥 fire optional callback
            if (onToggle) onToggle(checked as boolean);
          }}
          className="mt-1"
        />

        {typeof label === "string" ? (
          <label className="text-white text-sm font-medium mb-2 block">
            {label}
          </label>
        ) : (
          label
        )}
      </div>

      {errors[name] && (
        <p className="mt-1 text-xs text-red-300">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

// =====================TEXT INPUT2===================

const TextInput2 = ({ name, label, icon, rules, placeholder }: any) => {
  const { register, setValue, watch } = useFormContext();
  const value = watch(name) || "";

  const handleChange = (e: any) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue(name, formatted, { shouldValidate: true });
  };

  return (
    <div>
      <label className="text-white text-sm font-medium mb-2 block">
        {label}
      </label>

      <div className="relative">
        {/* icon */}
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}

        <input
          {...register(name, rules)}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={[
            "w-full h-[57.33px] rounded-xl",
            "text-white placeholder:text-gray-400 border border-[rgba(255,255,255,0.20)]",
            `focus:outline-none focus:ring-0 ${icon ? "pl-[48.66px]" : "pl-4"}`,
          ].join(" ")}
        />
      </div>
    </div>
  );
};

export { TextInput, TextInput2, SelectInput, TextArea, FormCheckbox };
