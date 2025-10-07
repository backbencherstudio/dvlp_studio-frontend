import React from "react";
import CustomDialog from "@/components/reusable/CustomDialog";

type DeleteConfirmProps = {
  isOpen: boolean;
  post: { title: string } | null; // Minimal: just title for confirmation
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmModal: React.FC<DeleteConfirmProps> = ({
  isOpen,
  post,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <CustomDialog open={isOpen} setOpen={(open) => !open && onCancel()}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the blog post "<strong>{post?.title}</strong>"? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </CustomDialog>
  );
};

export default DeleteConfirmModal;