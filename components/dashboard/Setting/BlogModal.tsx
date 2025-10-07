import CustomDialog from "@/components/reusable/CustomDialog";
import { ImageUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";

export interface BlogPost {
  id?: number;
  title: string;
  description: string;
  category: string;
  imageUrl?: string; // optional
}

type BlogModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  post?: BlogPost | null;
  onClose: () => void;
  onSave: (data: BlogFormData) => void;
};

type BlogFormData = {
  title: string;
  description: string;
  category: string;
  image: File | null;
};

const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  mode,
  post,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<{
    title: string;
    description: string;
    category: string;
    image: FileList | null;
  }>({
    defaultValues: {
      title: "",
      description: "",
      category: "Blog",
      image: null,
    },
    mode: "onChange",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && post) {
        reset({
          title: post.title,
          description: post.description,
          category: post.category,
          image: null,
        });
        setImagePreview(post.imageUrl || null);
      } else {
        reset();
        setImagePreview(null);
      }
    }
  }, [isOpen, mode, post, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = (data: FieldValues) => {
    const submitData: BlogFormData = {
      title: data.title,
      description: data.description,
      category: data.category,
      image: data.image?.[0] ?? null,
    };
    onSave(submitData);
  };

  if (!isOpen) return null;

  const labelStyle =
    "self-stretch text-[color:var(--Text-black-2,#7C7D81)] text-sm font-medium leading-[140%] tracking-[0.07px]";

  const inputStyle =
    "flex justify-end items-center gap-4 self-stretch border border-[color:var(--Color-border,#EBEBEB)] [background:#FFF] p-4 rounded-2xl border-solid w-full";

  return (
    <CustomDialog open={isOpen} setOpen={(open) => !open && onClose()}>
      <div>
        <h2>{mode === "add" ? "Create New Blog Post" : "Edit Blog Post"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-5">
          <div>
            <label className={labelStyle} htmlFor="title">
              Title
            </label>
            <input
              className={inputStyle}
              {...register("title", { required: "Title is required" })}
              id="title"
              placeholder="Title"
            />
            {errors.title && <p className="error">{errors.title.message}</p>}
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
              <p className="error">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className={labelStyle} htmlFor="category">
              Category
            </label>
            <input
              className={inputStyle}
              {...register("category")}
              placeholder="Category"
            />
          </div>

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
      {...register("image", {
        validate: (files) => {
          if (files?.[0] && !files[0].type.startsWith("image/")) {
            return "Please select a valid image file";
          }
          return true;
        },
      })}
      onChange={handleImageChange}
    />
  </label>

  {errors.image && (
    <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
  )}

  <p className="text-xs text-gray-500 mt-1">
    {mode === "edit" && post?.imageUrl
      ? "(Current image shown; select new to replace)"
      : "(Optional; preview above)"}
  </p>
</div>


          <div className="flex items-center justify-between gap-2 ">
            <button
              className="flex-1 flex h-14 justify-center items-center gap-3  [background:var(--background-normal-25,#F6F8FA)] px-4 py-3 rounded-2xl"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-3 rounded-2xl flex  justify-center items-center gap-3 [background:var(--linear,linear-gradient(90deg,#6366F1_0%,#A855F7_100%))] text-white"
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
};

export default BlogModal;
