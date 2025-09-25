"use client";

import {
  FieldValues,
  UseFormRegister,
  Controller,
  Control,
  Path,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useState, useRef, useEffect } from "react";

// Define types for the props
interface TimePickerFieldProps<T extends FieldValues = FieldValues> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T> | any;
  control: Control<T>;
  required?: boolean;
  placeholder?: string;
}

const CustomTimePicker = <T extends FieldValues = FieldValues>({
  label,
  name,
  register,
  control,
  required = false,
  placeholder = "Select a time",
}: TimePickerFieldProps<T>) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate hours (01-12)
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  // Generate minutes in 5-minute intervals
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const periods = ["AM", "PM"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopoverOpen]);

  const formatTimeForDisplay = (timeValue: string | null): string => {
    if (!timeValue) return placeholder;

    try {
      // Assuming timeValue is in format "HH:MM" (24-hour format)
      const [hours, minutes] = timeValue.split(":");
      const hourNum = parseInt(hours, 10);
      const minuteNum = parseInt(minutes, 10);

      const period = hourNum >= 12 ? "PM" : "AM";
      const displayHour = hourNum % 12 || 12;

      return `${displayHour.toString().padStart(2, "0")}:${minuteNum
        .toString()
        .padStart(2, "0")} ${period}`;
    } catch {
      return placeholder;
    }
  };

  const parseTimeTo24Hour = (
    hours: number,
    minutes: number,
    period: string
  ): string => {
    let hour24 = hours;

    if (period === "PM" && hours !== 12) {
      hour24 = hours + 12;
    } else if (period === "AM" && hours === 12) {
      hour24 = 0;
    }

    return `${hour24.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const parse24HourToComponents = (
    timeValue: string | null
  ): { hours: number; minutes: number; period: string } | null => {
    if (!timeValue) return null;

    try {
      const [hours, minutes] = timeValue.split(":");
      const hourNum = parseInt(hours, 10);
      const minuteNum = parseInt(minutes, 10);

      const period = hourNum >= 12 ? "PM" : "AM";
      const displayHour = hourNum % 12 || 12;

      return {
        hours: displayHour,
        minutes: minuteNum,
        period,
      };
    } catch {
      return null;
    }
  };

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
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label || name} is required` : false,
        }}
        render={({ field, fieldState }) => {
          const currentTime = parse24HourToComponents(field.value);

          const handleTimeChange = (
            type: "hours" | "minutes" | "period",
            value: number | string
          ) => {
            const newHours =
              type === "hours" ? Number(value) : currentTime?.hours || 9;
            const newMinutes =
              type === "minutes" ? Number(value) : currentTime?.minutes || 0;
            const newPeriod =
              type === "period" ? String(value) : currentTime?.period || "AM";

            const time24Hour = parseTimeTo24Hour(
              newHours,
              newMinutes,
              newPeriod
            );
            field.onChange(time24Hour);
          };

          return (
            <div ref={containerRef} className="relative">
              {/* Trigger Button */}
              <button
                type="button"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                className="mt-2 px-4 py-4 w-full border border-gray-300 rounded-lg text-left font-normal bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span
                      className={
                        !field.value ? "text-gray-400" : "text-gray-900"
                      }
                    >
                      {formatTimeForDisplay(field.value)}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isPopoverOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Dropdown Popover */}
              {isPopoverOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 animate-fade-in w-62">
                  <div className="p-2">
                    <div className="flex gap-1 divide-x">
                      {/* Hours Column */}
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-600 mb-1 text-center uppercase tracking-wide">
                          Hour
                        </div>
                        <div
                          className="space-y-1 max-h-30 overflow-y-auto "
                          style={{
                            scrollbarWidth: "none" /* Firefox */,
                            msOverflowStyle: "none" /* IE and Edge */,
                          }}
                        >
                          {hours.map((hour) => (
                            <button
                              key={hour}
                              type="button"
                              onClick={() => handleTimeChange("hours", hour)}
                              className={`w-full py-2 px-2 text-sm font-medium rounded transition-all duration-200 ${
                                currentTime?.hours === hour
                                  ? "bg-blue-500 text-white shadow-sm"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              }`}
                            >
                              {hour.toString().padStart(2, "0")}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Minutes Column */}
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-600 mb-1 text-center uppercase tracking-wide">
                          Min
                        </div>
                        <div
                          className="space-y-1 max-h-26 overflow-y-auto"
                          style={{
                            scrollbarWidth: "none" /* Firefox */,
                            msOverflowStyle: "none" /* IE and Edge */,
                          }}
                        >
                          {minutes.map((minute) => (
                            <button
                              key={minute}
                              type="button"
                              onClick={() =>
                                handleTimeChange("minutes", minute)
                              }
                              className={`w-full py-2 px-2 text-sm font-medium rounded transition-all duration-200 ${
                                currentTime?.minutes === minute
                                  ? "bg-blue-500 text-white shadow-sm"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              }`}
                            >
                              {minute.toString().padStart(2, "0")}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Period Column */}
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-gray-600 mb-1 text-center uppercase tracking-wide">
                          Period
                        </div>
                        <div className="space-y-1 max-h-26 overflow-y-auto">
                          {periods.map((period) => (
                            <button
                              key={period}
                              type="button"
                              onClick={() => handleTimeChange("period", period)}
                              className={`w-full py-2 px-2 text-sm font-medium rounded transition-all duration-200 ${
                                currentTime?.period === period
                                  ? "bg-blue-500 text-white shadow-sm"
                                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              }`}
                            >
                              {period}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Done Button */}
                    <div className=" pt-1 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setIsPopoverOpen(false)}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <ErrorMessage error={fieldState.error} />

              <style jsx>{`
                .animate-fade-in {
                  animation: fadeIn 0.2s ease-out;
                }
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomTimePicker;
