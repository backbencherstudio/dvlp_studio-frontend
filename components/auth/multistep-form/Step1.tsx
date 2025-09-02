import { useFormContext } from "react-hook-form";
import { FormValues } from "./ApplyMultiStep";
import { TextInput } from "./InputHelpers";
import AuthInput from "@/components/reusable/AuthInput";
import EmailIcon from "@/components/icons/EmailIcon";
import ErrorMessage from "@/components/reusable/ErrorMessage";
import PhoneIcon from "@/components/icons/PhoneIcon";
import { LockIcon } from "lucide-react";

/* ---------- Step 1: Basic info ---------- */
export default function Step1() {
  const { register, getValues } = useFormContext<FormValues>();
  const methods = useFormContext<FormValues>();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* <TextInput name="firstName" label="First Name" placeholder="First name" /> */}
        <TextInput
          name="firstName"
          label="First Name"
          placeholder="First name"
          rules={{ required: "First name is required" }}
        />
        <TextInput
          name="lastName"
          label="Last Name"
          placeholder="Last name"
          rules={{ required: "Last name is required" }}
        />
      </div>

       
      <TextInput
        name="email"
        label="Email Address"
        icon={<EmailIcon />}
        placeholder="Enter your email"
        type="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        }}
      />

      <TextInput
        name="phone"
        label="Phone Number"
        icon={<PhoneIcon />}
        placeholder="Enter your phone"
        rules={{
          required: "Phone is required",
          minLength: { value: 7, message: "Enter a valid phone" },
        }}
      />

  
  <TextInput
    name="password"
    label="Password"
    icon={<LockIcon />}
    type="password"
    placeholder="Create a password"
    rules={{
      required: "Password is required",
      minLength: { value: 6, message: "Minimum 6 characters" },
    }}
  />
  <TextInput
    name="confirmPassword"
    label="Confirm Password"
    icon={<LockIcon />}
    type="password"
    placeholder="Confirm your password"
    rules={{
      required: "Confirm your password",
      validate: (v) =>
        v === methods.getValues("password") || "Passwords do not match",
    }}
  />

    </div>
  );
}
