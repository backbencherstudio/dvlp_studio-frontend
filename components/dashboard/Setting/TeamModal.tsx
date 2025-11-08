import React, { useEffect, useState } from "react";
import { TeamMemberType } from "./TeamMember";
import { FieldValues, useForm } from "react-hook-form";
import CustomDialog from "@/components/reusable/CustomDialog";
import { ImageUpIcon } from "lucide-react";

type TeamModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  member?: TeamMemberType | null;
  onClose: () => void;
  onSave: (data: TeamFormData) => void;
};

export type TeamFormData = {
  name: string;
  image: File | null;
  designation: string;
  description: string;
};

export default function TeamModal({
  isOpen,
  mode,
  member,
  onClose,
  onSave,
}: TeamModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setValue,
    watch,
    trigger,
  } = useForm<TeamFormData>({
    defaultValues: {
      name: "",
      image: null,
      designation: "",
      description: "",
    },
    mode: "onChange",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const watchImage = watch("image");

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && member) {
        reset({
          name: member.name,
          image: null,
          designation: member.designation,
          description: member.description,
        });
        setImagePreview(member.imageUrl || null);
      } else {
        reset({
          name: "",
          image: null,
          designation: "",
          description: "",
        });
        setImagePreview(null);
      }
    }
  }, [isOpen, mode, member, reset]);

  // Handle image preview when image changes
  useEffect(() => {
    if (watchImage) {
      const previewUrl = URL.createObjectURL(watchImage);
      setImagePreview(previewUrl);

      // Clean up the object URL when component unmounts or image changes
      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    } else if (mode === "edit" && member?.imageUrl) {
      setImagePreview(member.imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [watchImage, mode, member]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      setValue("image", file, { shouldDirty: true });
      trigger("image"); // Trigger validation
    } else {
      setValue("image", null, { shouldDirty: true });
    }
  };

  const onSubmit = (data: FieldValues) => {
    const submitData: TeamFormData = {
      name: data.name,
      image: data.image, // Fixed: directly use data.image instead of data.image?.[0]
      designation: data.designation,
      description: data.description,
    };
    onSave(submitData);
  };

  if (!isOpen) return null;

  const labelStyle =
    "self-stretch text-[color:var(--Text-black-2,#7C7D81)] text-sm font-medium leading-[140%] tracking-[0.07px]";

  const inputStyle =
    "flex justify-end items-center gap-4 self-stretch border border-[color:var(--Color-border,#EBEBEB)] [background:#FFF] p-4 rounded-2xl border-solid w-full";

  return (
    <CustomDialog open={isOpen} setOpen={onClose}>
      <div>
        <h2>{mode === "add" ? "Add New Member" : "Edit Member"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Image Upload
            </label>

            <label
              htmlFor="image"
              className="w-full border border-gray-300 flex items-center justify-center h-36 rounded-2xl cursor-pointer overflow-hidden hover:bg-gray-50 transition"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <ImageUpIcon className="w-6 h-6 mb-1" />
                  <span className="text-sm text-gray-600">Click to upload</span>
                </div>
              )}

              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}

            <p className="text-xs text-gray-500 mt-1">
              {mode === "edit" && member?.imageUrl
                ? "(Current image shown; select new to replace)"
                : "(Select an image)"}
            </p>
          </div>

          <div>
            <label className={labelStyle} htmlFor="name">
              Name
            </label>
            <input
              className={inputStyle}
              {...register("name", { required: "Name is required" })}
              id="name"
              placeholder="Name"
            />
            {errors.name && <p className="error text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className={labelStyle} htmlFor="description">
              Description
            </label>
            <textarea
              className={inputStyle}
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Description"
              rows={4}
            />
            {errors.description && (
              <p className="error text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className={labelStyle} htmlFor="designation">
              Designation
            </label>
            <input
              className={inputStyle}
              {...register("designation", { required: "Designation is required" })}
              placeholder="Designation"
            />
            {errors.designation && (
              <p className="error text-sm text-red-500 mt-1">{errors.designation.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              className="flex-1 flex h-14 justify-center items-center gap-3 [background:var(--background-normal-25,#F6F8FA)] px-4 py-3 rounded-2xl"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-3 rounded-2xl flex justify-center items-center gap-3 [background:var(--linear,linear-gradient(90deg,#6366F1_0%,#A855F7_100%))] text-white"
              type="submit"
              disabled={!isDirty}
            >
              {mode === "add" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </CustomDialog>
  );
}