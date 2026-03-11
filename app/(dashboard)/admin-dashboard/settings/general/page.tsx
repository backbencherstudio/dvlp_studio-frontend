"use client";

import FormField from "@/components/reusable/AdminFormField";
import PasswordUpdate from "@/components/reusable/PasswordUpdate";
import ProfileUpdate from "@/components/reusable/ProfileUpdate";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

type AdminInfoFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function page() {
  return (
    <div className="max-w-[928px] space-y-5">


     <ProfileUpdate/>
     <PasswordUpdate/>

      {/* Edit admin info */}
      {/* <EditAdminInfo /> */}
      {/* contact info */}
      {/* <ContactInfo /> */}
      {/* Password update */}
      {/* <PasswordInfo/> */}
    </div>
  );
}

// ==============  Info Form Data  ===============

function EditAdminInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminInfoFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (data: AdminInfoFormData) => {
    console.log("Submitted:", data);
    // API call
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 rounded-xl space-y-5 bg-white"
    >
      <h3 className="text-[#1F2937] text-xl font-medium">Edit admin info</h3>

      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-accent"></div>
        <div className="">
          <label
            className="px-5 py-2 rounded-lg bg-[#F5F5F7] flex items-center font-medium cursor-pointer"
            htmlFor="photo"
          >
            + Upload Photo
            <input id="photo" className="hidden" type="file"></input>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <FormField
          id="firstName"
          label="First Name"
          register={register("firstName", {
            required: "First name is required",
          })}
          error={errors.firstName}
        />

        <FormField
          id="lastName"
          label="Last Name"
          register={register("lastName", {
            required: "Last name is required",
          })}
          error={errors.lastName}
        />

        <div className="md:col-span-2">
          <FormField
            id="email"
            type="email"
            label="Email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            error={errors.email}
            className="md:col-span-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-3 rounded-xl bg-[#1F2937] font-medium text-white cursor-pointer"
      >
        Save Changes
      </button>
    </form>
  );
}

// ==============  Contact Form Data  ===============

type ContactFormData = {
  contactEmail: string;
  contactPhone: string;
  timeZone: string;
};
function ContactInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      contactEmail: "",
      contactPhone: "",
      timeZone: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Submitted contactt data:", data);
    // API call
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 rounded-xl space-y-5 bg-white"
    >
      <h3 className="text-[#1F2937] text-xl font-medium">Contact Info</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <FormField
          id="contactEmail"
          label="Contact Emial"
          register={register("contactEmail", {
            required: "Contact Email is required",
          })}
          error={errors.contactEmail}
        />

        <FormField
          id="contactPhone"
          label="Contact Phone"
          register={register("contactPhone", {
            required: "Contact phone is required",
          })}
          error={errors.contactPhone}
        />

        <div className="md:col-span-2">
          <FormField
            id="timeZone"
            type="timeZone"
            label="Timezone"
            register={register("timeZone", {
              required: "Timezone is required",
            })}
            error={errors.timeZone}
            className="md:col-span-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-3 rounded-xl bg-[#1F2937] font-medium text-white cursor-pointer"
      >
        Save Changes
      </button>
    </form>
  );
}

// ==============  Password Form Data  ===============
type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
function PasswordInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordFormData) => {
    console.log("Password data:", data);
    // API call
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 rounded-xl space-y-5 bg-white"
    >
      <h3 className="text-[#1F2937] text-xl font-medium">Password Update</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <FormField
          id="currentPassword"
          label="Current Password"
          register={register("currentPassword", {
            required: "Current Password is required",
          })}
          error={errors.currentPassword}
        />

        <FormField
          id="newPassword"
          label="New Password"
          register={register("newPassword", {
            required: "New Password is required",
          })}
          error={errors.newPassword}
        />

        <div className="md:col-span-2">
          <FormField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            register={register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            error={errors.confirmPassword}
            className="md:col-span-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-3 rounded-xl bg-[#1F2937] font-medium text-white cursor-pointer"
      >
        Save Changes
      </button>
    </form>
  );
}
