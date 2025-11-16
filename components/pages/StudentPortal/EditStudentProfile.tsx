"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ProfileFormValues = {
  firstname: string;
  lastname: string;
  role: string;
  image?: File | string | null; // 👈 store File, not string
  location: string;
  about: string;
  sessionGrade: string;
};

export const EditStudentProfile = ({
  initialData,
}: {
  initialData: Omit<ProfileFormValues, "image"> & { image?: string };
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      ...initialData,
      image: undefined, // don't prefill File
    },
  });

  const [preview, setPreview] = useState<string | null>(
    initialData?.image || null
  );
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // ✅ keep actual File
      setPreview(URL.createObjectURL(selectedFile)); // for preview
      setValue("image", selectedFile); // ✅ set File in react-hook-form
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("first_name", data.firstname);
    formData.append("last_name", data.lastname);

    formData.append("Co", data.location);
    formData.append("about", data.about);
    formData.append("sessionGrade", data.sessionGrade);

    if (file) {
      formData.append("image", file); // ✅ actual file
    }

    // Example API call
    const res = await fetch("/api/students/update", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      console.log("Profile updated successfully");
      toast.success("Profile Updated Successfully!");
    } else {
      console.error("Update failed");
      toast.error("Profile Update failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[902px] mx-auto bg-white rounded-2xl border divide-y divide-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 cursor-pointer" />
          </button>
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>
        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save
        </button>
      </div>

      {/* Profile Image */}
      <div className="px-6 py-6">
        <div className="relative w-32 h-32">
          <div className="w-full h-full rounded-2xl overflow-hidden relative group">
            <img
              src={preview || "/default-avatar.png"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <label
              htmlFor="profileImage"
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition cursor-pointer"
            >
              <Upload className="w-8 h-8 text-white" />
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="px-6 py-8">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          First Name
        </label>
        <input
          {...register("firstname", { required: "Name is required" })}
          className="w-full border rounded-lg px-4 py-3"
        />
        {errors.firstname && (
          <p className="text-red-500 text-sm">{errors.firstname.message}</p>
        )}
      </div>
      {/* Name */}
      <div className="px-6 py-8">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Last Name
        </label>
        <input
          {...register("lastname", { required: "Name is required" })}
          className="w-full border rounded-lg px-4 py-3"
        />
        {errors.lastname && (
          <p className="text-red-500 text-sm">{errors.lastname.message}</p>
        )}
      </div>

      {/* Role & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Designation
          </label>
          <input
            {...register("role")}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Country
          </label>
          <input
            {...register("location")}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </div>

      {/* About */}
      <div className="px-6 py-8">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          About
        </label>
        <textarea
          {...register("about")}
          rows={4}
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>

      {/* Session Grades */}
      <div className="px-6 py-8">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Session Grades & Levels
        </label>
        <input
          {...register("sessionGrade")}
          className="w-full border rounded-lg px-4 py-3"
        />
      </div>
    </form>
  );
};
