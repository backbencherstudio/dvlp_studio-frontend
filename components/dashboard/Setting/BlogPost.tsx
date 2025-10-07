import React, { useState } from "react";
import BlogModal from "./BlogModal";
import { Trash, Trash2 } from "lucide-react";
import DeleteConfirmModal from "./BlogDeleteConfirm";
type BlogPostType = {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
};
const fakeBlogs = [
  {
    id: 1,
    title: "AI-Powered Matching for Learners",
    description:
      "Discover how our intelligent system pairs students with the perfect tutor based on learning style and goals.",
    category: "Technology",
  },
  {
    id: 2,
    title: "Top 10 Study Techniques for Online Learning",
    description:
      "Explore the most effective methods to retain knowledge and improve your learning efficiency in digital classrooms.",
    category: "Education",
  },
  {
    id: 3,
    title: "The Future of AI in Education",
    description:
      "A deep dive into how artificial intelligence is transforming the way students learn and teachers instruct.",
    category: "Innovation",
  },
  {
    id: 4,
    title: "Time Management Tips for Students",
    description:
      "Learn practical strategies to balance study, work, and personal life for maximum productivity.",
    category: "Lifestyle",
  },
  {
    id: 5,
    title: "Gamification in Learning",
    description:
      "How adding game elements to education can motivate students and enhance engagement.",
    category: "Education",
  },
  {
    id: 6,
    title: "Understanding Learning Styles",
    description:
      "A guide to identifying visual, auditory, and kinesthetic learning styles to optimize study habits.",
    category: "Self-Improvement",
  },
];

export default function BlogPost() {
  const [posts, setPosts] = useState<BlogPostType[]>(fakeBlogs);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [currentPost, setCurrentPost] = useState<BlogPostType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<BlogPostType | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleCreate = () => {
    setMode("add");
    setCurrentPost(null);
    setModalOpen(true);
  };

  const handleEdit = (post: BlogPostType) => {
    setMode("edit");
    setCurrentPost(post);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentPost(null);
    setModalOpen(false);
  };

  const handleDelete = (post: BlogPostType) => {
    setPostToDelete(post);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;

    setIsDeleting(postToDelete.id);
    setShowDeleteConfirm(false); // Close modal first

    try {
      // API call (uncomment for real backend)
      // await fetch(`/api/posts/${postToDelete.id}`, { method: 'DELETE' });

      // Optimistic update
      setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));

      console.log(`Deleted post ${postToDelete.id}`);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post. Try again?");
      // Rollback: Could refetch here
    } finally {
      setIsDeleting(null);
      setPostToDelete(null);
    }
  };

  const handleSave = async (formData: {
    title: string;
    description: string;
    category: string;
    image: File | null;
  }) => {
    console.log("Got formdata", formData);

    if (mode === "add") {
      const newPost: BlogPostType = {
        id: posts.length + 1, // simple ID generation
        title: formData.title,
        description: formData.description,
        category: formData.category,
        // imageUrl: you can handle file upload to get URL
      };
      setPosts([...posts, newPost]);
    } else if (mode === "edit" && currentPost) {
      setPosts(
        posts.map((p) =>
          p.id === currentPost.id
            ? {
                ...p,
                title: formData.title,
                description: formData.description,
                category: formData.category,
              }
            : p
        )
      );
    }

    handleCloseModal();
  };

  // Generate a unique key for the modal to force remount on each open
  const modalKey = modalOpen
    ? `${mode}-${currentPost?.id ?? "new"}`
    : undefined;

  return (
    <div className="bg-white px-8 py-6 rounded-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">
          Blog Post
        </h2>

        <button
          onClick={handleCreate}
          className="bg-gradient-to-l to-[#6366F1] from-[#A855F7] text-white font-semibold px-3 py-2 rounded-lg cursor-pointer"
        >
          + Create Blog
        </button>
      </div>

      {/* all blogs */}
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-3 rounded-md flex items-start gap-5 justify-between bg-[#F6F8FA]"
          >
            <div className="flex gap-6">
              {/* img */}
              <div className="w-16 h-16 rounded overflow-hidden bg-red-300 shrink-0"></div>

              {/* info */}
              <div>
                <h3 className="text-slate-800 text-lg font-medium leading-8">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm font-normal leading-[29.25px]">
                  {post.description}
                </p>
                <p className="text-[#003466] text-sm font-medium leading-6">
                  Learn more
                </p>

                <div className="inline-block border border-[color:var(--background-pressed-100,#DFE1E7)] bg-white px-5 py-1.5 rounded-full mt-4">
                  <p>Category: {post.category}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="flex justify-center items-center gap-2.5 border border-[color:var(--background-pressed-100,#DFE1E7)] bg-white px-4 py-1 rounded-[99px] cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post)}
                className="flex justify-center items-center gap-2.5 border border-[color:var(--background-pressed-100,#DFE1E7)] bg-white px-4 py-1 rounded-[99px] cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* blog modal */}
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
        onCancel={() => {
          setShowDeleteConfirm(false);
          setPostToDelete(null);
        }}
      />
    </div>
  );
}
