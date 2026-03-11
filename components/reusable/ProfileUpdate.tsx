"use client";

import { useForm } from "react-hook-form";
import { privateAxios } from "@/lib/axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Camera, User } from "lucide-react";

interface FormValues {
  name: string;
  last_name: string;
  city: string;
  country: string;
  about_me: string;
  avatar: FileList;
}

export default function ProfileUpdate() {
  const { user } = useAuth(); // Assuming you have a refreshUser method

  console.log("User Data", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // Preload form data when user data is available
  useEffect(() => {
    if (user) {
      // Split full name into first and last name if needed
      // This assumes your user object might have name instead of first_name/last_name
      const firstName = user.first_name || user.name?.split(' ')[0] || '';
      const lastName = user.last_name || (user.name?.split(' ').slice(1).join(' ') || '');
      
      reset({
        name: firstName || '',
        last_name: lastName || '',
        city: user?.city || '',
        country: user.country || '',
        about_me: user.about_me || '',
      });

      // Set avatar preview
      if (user.avatar_url && user.avatar_url !== 'null' && !user.avatar_url.includes('/null')) {
        setPreview(user.avatar_url);
      } else {
        setPreview(null);
      }
    }
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      const formData = new FormData();
      
      // Only append avatar if a new one is selected
      if (data.avatar?.[0]) {
        formData.append("avatar", data.avatar[0]);
      }
      
      // Append other fields (use empty string if undefined)
      formData.append("name", data.name || '');
      formData.append("last_name", data.last_name || '');
      formData.append("city", data.city || '');
      formData.append("country", data.country || '');
      formData.append("about_me", data.about_me || '');

      const res = await privateAxios.patch("/auth/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully");
      console.log(res.data);
      
      // Refresh user data in context

    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // Helper function to display N/A for null/empty values
  const displayValue = (value: any): string => {
    if (value === null || value === undefined || value === '' || value === 'null') {
      return 'N/A';
    }
    return String(value);
  };

  const inputClass =
    "w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-500";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl border mt-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 px-6 pt-6 justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">Update Profile</h2>
          {user?.email && (
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          )}
          {/* Display user type/role */}
          {user?.type && (
            <p className="text-xs text-gray-400 mt-1 capitalize">
              Role: {user.type}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#04043b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#02002c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Updating...
            </span>
          ) : (
            "Update Profile"
          )}
        </button>
      </div>

      {/* User Info Summary - Optional section to show current values */}
      <div className="px-6 pt-4 pb-2 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Current Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Phone:</span>{' '}
            <span className="font-medium">{displayValue(user?.phone_number)}</span>
          </div>
          <div>
            <span className="text-gray-400">Gender:</span>{' '}
            <span className="font-medium">{displayValue(user?.gender)}</span>
          </div>
          <div>
            <span className="text-gray-400">DOB:</span>{' '}
            <span className="font-medium">
              {user?.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Address:</span>{' '}
            <span className="font-medium">{displayValue(user?.address)}</span>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
        {/* Avatar Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Avatar
          </label>

          <div className="flex items-center gap-5">
            {/* Preview circle */}
            <div className="relative w-20 h-20 rounded-full bg-gray-100 overflow-hidden border-2 border-gray-200 flex-shrink-0">
              {preview && preview !== 'null' && !preview.includes('/null') ? (
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="avatar preview"
                  onError={() => setPreview(null)} // Fallback if image fails to load
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User size={28} />
                </div>
              )}
            </div>

            {/* Custom file button */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Camera size={15} />
                {preview && preview !== 'null' && !preview.includes('/null') ? "Change Photo" : "Upload Photo"}
              </label>
              <p className="text-xs text-gray-400">
                JPG, PNG or WEBP · Max 5MB
              </p>

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("avatar")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImagePreview(file);
                }}
              />
            </div>
          </div>
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          <input
            {...register("name", { 
              required: "First name is required",
              setValueAs: (value) => value || '' // Ensure empty string instead of undefined
            })}
            disabled={loading}
            className={inputClass}
            placeholder="Enter first name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name
          </label>
          <input
            {...register("last_name", { 
              required: "Last name is required",
              setValueAs: (value) => value || ''
            })}
            disabled={loading}
            className={inputClass}
            placeholder="Enter last name"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            City
          </label>
          <input
            {...register("city", { 
              required: "City is required",
              setValueAs: (value) => value || ''
            })}
            disabled={loading}
            className={inputClass}
            placeholder="Enter city"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Country
          </label>
          <input
            {...register("country", { 
              required: "Country is required",
              setValueAs: (value) => value || ''
            })}
            disabled={loading}
            className={inputClass}
            placeholder="Enter country"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* About Me */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            About Me
          </label>
          <textarea
            {...register("about_me", {
              setValueAs: (value) => value || ''
            })}
            rows={4}
            disabled={loading}
            className={`${inputClass} resize-none`}
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </form>
  );
}