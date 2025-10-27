"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface SessionData {
  id?: string;
  name?: string;
  subject?: string;
  status?: string;
  [key: string]: any;
}

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  actionType: "view" | "delete" | "restrict" | null;
  data?: SessionData | null;
  onConfirm?: () => void;
  loading?: boolean;
  isDetailsLoading?: boolean;
}

const ActionModal: React.FC<ActionModalProps> = ({
  open,
  onClose,
  actionType,
  data,
  onConfirm,
  loading = false,
  isDetailsLoading = false,
}) => {
  if (!actionType) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        {isDetailsLoading ? (
          <>loading</>
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle className="capitalize">
                {actionType} {data?.name || data?.id || "item"}
              </DialogTitle>
            </DialogHeader>

            {/* VIEW MODE */}
            {actionType === "view" && (
              <div className="space-y-2">
                <p>
                  <strong>ID:</strong> {data?.id}
                </p>
                <p>
                  <strong>Name:</strong> {data?.name}
                </p>
                {data?.subject && (
                  <p>
                    <strong>Subject:</strong> {data.subject}
                  </p>
                )}
                {data?.status && (
                  <p>
                    <strong>Status:</strong> {data.status}
                  </p>
                )}
              </div>
            )}

            {/* DELETE / RESTRICT MODE */}
            {(actionType === "delete" || actionType === "restrict") && (
              <div className="text-center space-y-4">
                <p>
                  Are you sure you want to{" "}
                  <span className="font-semibold text-red-500">
                    {actionType}
                  </span>{" "}
                  this session?
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    className=" cursor-pointer"
                    variant="destructive"
                    onClick={onConfirm}
                    disabled={loading}
                  >
                    {loading
                      ? actionType === "delete"
                        ? "Deleting..."
                        : "Restricting..."
                      : actionType === "delete"
                      ? "Delete"
                      : "Restrict"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ActionModal;
