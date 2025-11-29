"use client";

import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  X,
  FileText,
  Image,
  File,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { privateAxios } from "@/lib/axios";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  aboutMe: string;
  gradesTaught: string[];
  certifications: string[];
  image?: File;
};

export const EditTutorProfile = ({
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
    watch,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      ...initialData,
      image: undefined,
    },
  });

  const [preview, setPreview] = useState<string>(
    initialData?.image?.toLowerCase()?.trim() === "avatar/null"
      ? "/profile-placeholder.jpg"
      : initialData?.image || "null"
  );
  const [file, setFile] = useState<File | null>(null);
  const [newGrade, setNewGrade] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [previewFile, setPreviewFile] = useState<{
    file: File;
    url: string;
  } | null>(null);

  const handlePreviewFile = (file: File) => {
    if (file.type.includes("image")) {
      const url = URL.createObjectURL(file);
      setPreviewFile({ file, url });
    } else if (file.type.includes("pdf")) {
      // For PDFs, you might want to open in new tab or use a PDF viewer
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    }
  };

  // Watch arrays to get real-time updates
  const gradesTaught = watch("gradesTaught") || [];
  const certifications = watch("certifications") || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setValue("image", selectedFile);
    }
  };

  const addGrade = () => {
    if (newGrade.trim() && !gradesTaught.includes(newGrade.trim())) {
      const updatedGrades = [...gradesTaught, newGrade.trim()];
      setValue("gradesTaught", updatedGrades);
      setNewGrade("");
    }
  };

  const removeGrade = (index: number) => {
    const updatedGrades = gradesTaught.filter((_, i) => i !== index);
    setValue("gradesTaught", updatedGrades);
  };

  const addCertification = () => {
    if (
      newCertification.trim() &&
      !certifications.includes(newCertification.trim())
    ) {
      const updatedCerts = [...certifications, newCertification.trim()];
      setValue("certifications", updatedCerts);
      setNewCertification("");
    }
  };

  const removeCertification = (index: number) => {
    const updatedCerts = certifications.filter((_, i) => i !== index);
    setValue("certifications", updatedCerts);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    // formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("about_me", data.aboutMe);
    formData.append("grades_taught ", JSON.stringify(data.gradesTaught));
    // formData.append("certifications", JSON.stringify(data.certifications));

    if (file) {
      formData.append("avatar", file);
    }

    const res = await privateAxios.patch("/auth/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Res is ", res);

    if (res.data.success) {
      console.log("Tutor profile updated successfully");
      router.push("/tutor-portal/profile"); // Redirect to profile page
    } else {
      console.error("Update failed");
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
          <button type="button" onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 cursor-pointer" />
          </button>
          <h2 className="text-xl font-semibold">Edit Tutor Profile</h2>
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
              src={preview}
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

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            First Name *
          </label>
          <input
            {...register("firstName", { required: "First name is required" })}
            className="w-full border rounded-lg px-4 py-3"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Name *
          </label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className="w-full border rounded-lg px-4 py-3"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="px-6 py-8">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email *
        </label>
        <input
          readOnly
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            City
          </label>
          <input
            {...register("city")}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Country
          </label>
          <input
            {...register("country")}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </div>

      {/* About Me */}
      <div className="px-6 py-8">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          About Me
        </label>
        <textarea
          {...register("aboutMe")}
          rows={4}
          className="w-full border rounded-lg px-4 py-3"
          placeholder="Share your teaching philosophy, experience, and what makes you a great tutor..."
        />
      </div>

      {/* Grades Taught */}
      <div className="px-6 py-8">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Grades Taught
        </label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              placeholder="Add a grade level (e.g., Grade_K, Grade_5, Grade_8)"
              className="flex-1 border rounded-lg px-4 py-3"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addGrade();
                }
              }}
            />
            <button
              type="button"
              onClick={addGrade}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          {gradesTaught.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {gradesTaught.map((grade, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-3 py-2 rounded-lg flex items-center gap-2"
                >
                  <span>{grade}</span>
                  <button
                    type="button"
                    onClick={() => removeGrade(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="px-6 py-8 hidden">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Certifications
        </label>
        <div className="space-y-4">
          {/* File Upload Input */}
          {/* <div className="flex gap-2">
                        <label className="flex-1 cursor-pointer">
                            <input
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || []);
                                    if (files.length > 0) {
                                        // Add all selected files to certifications
                                        const updatedCerts = [...certifications, ...files];
                                        setValue("certifications", updatedCerts);
                                    }
                                }}
                                className="hidden"
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                    Click to upload certification files
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, JPG, PNG, DOC (Max: 10MB each)
                                </p>
                            </div>
                        </label>
                    </div> */}

          {/* Uploaded Files List */}
          {/* {certifications.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-600">Uploaded Certifications:</h4>
                            <div className="space-y-2">
                                {certifications.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border"
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                       
                                            {file.type?.includes('pdf') ? (
                                                <FileText className="w-5 h-5 text-red-500" />
                                            ) : file.type?.includes('image') ? (
                                                <Image className="w-5 h-5 text-blue-500" />
                                            ) : file.type?.includes('word') || file.name?.endsWith('.doc') || file.name?.endsWith('.docx') ? (
                                                <FileText className="w-5 h-5 text-blue-600" />
                                            ) : (
                                                <File className="w-5 h-5 text-gray-500" />
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {file.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Size unknown'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                     
                                            {(file.type?.includes('image') || file.type?.includes('pdf')) && (
                                                <button
                                                    type="button"
                                                    onClick={() => handlePreviewFile(file)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    Preview
                                                </button>
                                            )}

                                          
                                            <button
                                                type="button"
                                                onClick={() => removeCertification(index)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} */}
        </div>
      </div>
    </form>
  );
};
