"use client";

import React, { useState } from "react";
import BlogModal from "./BlogModal";
import DeleteConfirmModal from "./BlogDeleteConfirm";
import { Trash2 } from "lucide-react";
import { useBlogs, useBlogMutations } from "./useBlog";
import Image from "next/image";

type BlogPostType = {
  id?: number;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
};

export default function BlogPost() {
  const { data, isLoading, isError } = useBlogs();
  const { createMut, editMut, deleteMut } = useBlogMutations(null);

  const blogs = data?.data?.blogs || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [currentPost, setCurrentPost] = useState<BlogPostType | null>(null);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPostType | null>(null);

  // open create modal
  const handleCreate = () => {
    setMode("add");
    setCurrentPost(null);
    setModalOpen(true);
  };

  // open edit modal
  const handleEdit = (post: BlogPostType) => {
    setMode("edit");
    setCurrentPost(post);
    setModalOpen(true);
  };

  // close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentPost(null);
  };

  // delete confirm modal open
  const handleDelete = (post: BlogPostType) => {
    setPostToDelete(post);
    setShowDeleteConfirm(true);
  };

  // delete confirm
  const handleConfirmDelete = () => {
    if (!postToDelete?.id) return;
    deleteMut.mutate(postToDelete.id.toString(), {
      onSuccess: () => {
        setShowDeleteConfirm(false);
        setPostToDelete(null);
      },
    });
  };

  // handle save (add or edit)
  const handleSave = (data: {
    title: string;
    description: string;
    category: string;
    image: File | null;
  }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    if (data.image) {
      formData.append("image", data.image, data.image.name);
    }


    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }


    if (mode === "add") {
      createMut.mutate(
        { payload: formData },
        {
          onSuccess: () => handleCloseModal(),
        }
      );

    } else if (mode === "edit" && currentPost?.id) {
      editMut.mutate(
        { id: currentPost.id.toString(), payload: formData },
        {
          onSuccess: () => handleCloseModal(),
        }
      );
    }
  };


  const modalKey = modalOpen ? `${mode}-${currentPost?.id ?? "new"}` : undefined;

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError) return <p>Failed to load blogs.</p>;

  return (
    <div className="bg-white px-8 py-6 rounded-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">
          Blog Post
        </h2>

        <button
          onClick={handleCreate}
          className="bg-gradient-to-l to-[#6366F1] from-[#A855F7] text-white font-semibold px-3 py-2 rounded-lg"
        >
          + Create Blog
        </button>
      </div>

      {/* All blogs */}
      <div className="space-y-3">
        {blogs.map((post: any) => (
          <div
            key={post.id}
            className="p-3 rounded-md flex items-start gap-5 justify-between bg-[#F6F8FA]"
          >
            <div className="flex gap-6">
              {/* <div className="w-16w-16 h-16 rounded h-16 rounded overflow-hidden shrink-0"> */}
              <img className="w-16 h-16 rounded shrink-0 overflow-hidden" src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/${post.image}`} alt="" crossOrigin="anonymous" />

              {/* <img className="w-16 h-16 rounded-2xl overflow-hidden object-cover" src="https://rebecca-sig-softball-leading.trycloudflare.com/public/storage/blog/cfaf0b5f-10bb-4e15-8789-ff5dd8737489-lifestyle-.jpg" crossOrigin="anonymous" alt="no-img" /> */}

              
             

              {/* </div> */}
              <div>
                <h3 className="text-slate-800 text-lg font-medium leading-8">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-[29.25px]">
                  {post.description}
                </p>
                <p className="text-[#003466] text-sm font-medium leading-6">
                  Learn more
                </p>

                <div className="inline-block border border-[#DFE1E7] bg-white px-5 py-1.5 rounded-full mt-4">
                  <p>Category: {post.category}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="border border-[#DFE1E7] bg-white px-4 py-1 rounded-[99px]"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post)}
                className="border border-[#DFE1E7] bg-white px-4 py-1 rounded-[99px]"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* modals */}
      <BlogModal
        key={modalKey}
        isOpen={modalOpen}
        mode={mode}
        post={currentPost}
        onClose={handleCloseModal}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        post={postToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
