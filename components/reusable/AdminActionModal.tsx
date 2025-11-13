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
  session_type?: string;
  session_charge?: string;
  mode?: string;
  join_link?: string;
  slots_available?: number | null;
  is_restricted?: number;
  restriction_reason?: string | null;
  is_completed?: number;
  available_slots_time_and_date?: string[];
  pdf_attachment?: string[];
  [key: string]: any;
}

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  actionType: "view" | "delete" | "restrict" | "unrestrict" | null;
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
      <DialogContent className="max-w-lg">
        {isDetailsLoading ? (
          <p className="text-center py-6">Loading...</p>
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle className="capitalize">
                {actionType} {data?.session_type || data?.subject || "Session"}
              </DialogTitle>
            </DialogHeader>

            {/* VIEW MODE */}
            {actionType === "view" && data && (
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <strong>ID:</strong> {data.id}
                </p>
                <p>
                  <strong>Subject:</strong> {data.subject}
                </p>
                <p>
                  <strong>Session Type:</strong> {data.session_type}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      data.status === "active" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    {data.status}
                  </span>
                </p>
                <p>
                  <strong>Mode:</strong> {data.mode}
                </p>
                <p>
                  <strong>Charge:</strong> ${data.session_charge}
                </p>

                {data.join_link && (
                  <p>
                    <strong>Join Link:</strong>{" "}
                    <a
                      href={data.join_link}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {data.join_link}
                    </a>
                  </p>
                )}

                {data.available_slots_time_and_date?.length ? (
                  <div>
                    <strong>Available Slots:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {data.available_slots_time_and_date.map((slot, i) => (
                        <li key={i}>
                          {new Date(slot).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>
                    <strong>Available Slots:</strong> None
                  </p>
                )}

                {data.is_restricted ? (
                  <p className="text-red-600">
                    <strong>Restricted:</strong> Yes
                    {data.restriction_reason && (
                      <> ({data.restriction_reason})</>
                    )}
                  </p>
                ) : (
                  <p>
                    <strong>Restricted:</strong> No
                  </p>
                )}

                <p>
                  <strong>Completed:</strong> {data.is_completed ? "Yes" : "No"}
                </p>

                {data.pdf_attachment?.length ? (
                  <div>
                    <strong>Attachments:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {data.pdf_attachment.map((file, i) => (
                        <li key={i}>
                          <a
                            href={file}
                            target="_blank"
                            className="text-blue-600 underline"
                          >
                            PDF {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>
                    <strong>Attachments:</strong> None
                  </p>
                )}
              </div>
            )}

            {/* DELETE / RESTRICT MODE */}
            {(actionType === "delete" ||
              actionType === "restrict" ||
              actionType === "unrestrict") && (
              <div className="text-center space-y-4 mt-6">
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
                    className="cursor-pointer"
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
