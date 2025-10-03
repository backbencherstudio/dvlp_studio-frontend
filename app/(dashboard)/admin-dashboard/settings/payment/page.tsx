"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormField from "@/components/reusable/AdminFormField";

type PaymentSettingData = {
  commissionType: string;
  commissionValue: string;
};

export default function PaymentPage() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<PaymentSettingData>({
    defaultValues: {
      commissionType: "",
      commissionValue: "",
    },
  });

  return (
    <div className="max-w-[992px]">
      <h2 className="mb-5 text-[#1F2937] text-xl font-medium">Payment settings</h2>

      {/* Commission Type (Select) */}
      <div className="mb-4">
        <label
          htmlFor="commissionType"
          className="mb-2 block font-medium leading-[160%] tracking-[0.08px] text-[#4A4C56]"
        >
          Commission Type
        </label>

        <Controller
          name="commissionType"
          control={control}
          rules={{ required: "Commission Type is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="commissionType" className="w-full">
                <SelectValue placeholder="Select commission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="flat">Flat Amount</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.commissionType && (
          <p className="mt-1 text-sm text-red-500">
            {errors.commissionType.message}
          </p>
        )}
      </div>

      {/* Commission Value (Input using FormField) */}
      <FormField
        id="commissionValue"
        label="Commission Value"
        register={register("commissionValue", {
          required: "Commission Value is required",
        })}
        error={errors.commissionValue}
      />
    </div>
  );
}
