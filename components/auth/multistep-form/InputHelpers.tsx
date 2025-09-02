import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { FormValues } from "./ApplyMultiStep";
import AuthInput from "@/components/reusable/AuthInput";
import { AuthSelect } from "@/components/reusable/AuthSelect";
import { Checkbox } from "@/components/ui/checkbox";

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
  name: keyof FormValues;
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
  label: string;
  rules?: RegisterOptions<FormValues, keyof FormValues>;
};

function FormCheckbox({ name, label, rules }: CheckboxProps) {
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
          onCheckedChange={(checked) =>
            setValue(name, checked as boolean, { shouldDirty: true })
          }
          className="mt-1"
        />
        <label htmlFor={name} className="text-sm text-white leading-relaxed">
          {label}
        </label>
      </div>
      {errors[name] && (
        <p className="mt-1 text-xs text-red-300">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

export { TextInput, SelectInput, TextArea, FormCheckbox };
