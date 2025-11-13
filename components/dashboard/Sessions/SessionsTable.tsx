"use client";

import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReusableTable from "@/components/reusable/ReusableTable";
import ActionModal from "@/components/reusable/AdminActionModal";
import {
  useSessionDetails,
  useSessionMutations,
  useSessions,
} from "./useSessions";
import { toast } from "sonner";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";

const SessionTable = () => {
  const { data: sessionss, isFetching, isError } = useSessions();

  //
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // unified modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<
    "view" | "delete" | "restrict" | "unrestrict" | null
  >(null);
  const [selectedData, setSelectedData] = useState<any>(null);

  const { data: sessionDetails, isLoading: loadingDetails } = useSessionDetails(
    modalAction === "view" ? selectedData?.id : undefined
  );
  const { deleteMut, restrictMut, unRestrictMut } = useSessionMutations();

  const handleActionClick = (
    action: "view" | "delete" | "restrict" | "unrestrict",
    rowData: any
  ) => {
    setOpenIndex(null);
    setModalAction(action);
    setSelectedData(rowData);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(`Confirmed ${modalAction} for`, selectedData);
    // call your API here (delete/restrict)

    if (!modalAction || !selectedData?.id) return;

    if (modalAction === "delete") {
      deleteMut.mutate(selectedData?.id, {
        onSuccess: () => toast.success("Session deleted successfully!"),
        onError: () => toast.error("Failed to delete session"),
      });
    }

    if (modalAction === "restrict") {
      restrictMut.mutate(selectedData?.id, {
        onSuccess: () => toast.success("Session restricted successfully!"),
        onError: () => toast.error("Failed to restrict session"),
      });
    }

    if (modalAction === "unrestrict") {
      unRestrictMut.mutate(selectedData?.id, {
        onSuccess: () => toast.success("Session restricted successfully!"),
        onError: () => toast.error("Failed to restrict session"),
      });
    }

    setModalOpen(false);
  };

  const columns = [
    {
      id: "id",
      label: "SESSION ID",
      renderRow: (row: any) => (
        <p className="cursor-default" title={row.id}>
          {row.id.slice(0, 5)}...{row.id.slice(20)}
        </p>
      ),
    },
    { id: "subject", label: "SUBJECT" },
    { id: "tutor_name", label: "TUTOR" },
    { id: "duration", label: "DURATION" },
    { id: "session_charge", label: "CHARGE ($)" },
    {
      id: "available_slots_time_and_date",
      label: "AVAILABLE SLOTS",
      renderRow: (row: any) => (
        <p className="text-sm text-gray-600">
          {row.available_slots_time_and_date.length > 0
            ? `${row.available_slots_time_and_date.length} slots`
            : "No slots"}
        </p>
      ),
    },
    {
      id: "Book_Session",
      label: "BOOKED BY",
      renderRow: (row: any) => (
        <p className="text-sm text-gray-600">
          {row.Book_Session.length > 0 ? (
            <>
              {row.Book_Session[0].name}
              {row.Book_Session.length > 1 && (
                <span> +{row.Book_Session.length - 1} more</span>
              )}
            </>
          ) : (
            "No Bookings"
          )}
        </p>
      ),
    },
    {
      id: "status",
      label: "STATUS",
      renderRow: (row: any) => (
        <p>{row.status === "active" ? <span>Active</span> : <p>Restrict</p>}</p>
      ),
    },
    {
      id: "action",
      label: "Action",
      renderRow: (row: any, index: number) => (
        <td className="text-sm text-gray-600">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleActionClick("view", row)}
              className="text-blue-500 px-2 py-1.5 rounded-md border border-gray-200 cursor-pointer"
            >
              View
            </button>

            <Popover
              open={openIndex === index}
              onOpenChange={(isOpen) => setOpenIndex(isOpen ? index : null)}
            >
              <PopoverTrigger asChild>
                <button className="text-blue-500 p-1.5 rounded-md border border-gray-200 cursor-pointer">
                  <EllipsisVertical />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-28 p-2 space-y-2 mr-12">
                <button
                  className="w-full cursor-pointer bg-black text-white rounded-md py-2"
                  onClick={() => handleActionClick("delete", row)}
                >
                  Delete
                </button>
                {/* <button
                  className="w-full cursor-pointer bg-red-400 text-white rounded-md py-2"
                  onClick={() => handleActionClick("restrict", row)}
                >
                  {row.status === "active" ? (
                    <span>Restrict</span>
                  ) : (
                    <span>UnRestrict</span>
                  )}
                </button> */}

                {row.status === "active" ? (
                  <button
                    className="w-full cursor-pointer bg-red-400 text-white rounded-md py-2"
                    onClick={() => handleActionClick("restrict", row)}
                  >
                    Restrict
                  </button>
                ) : (
                  <button
                    className="w-full cursor-pointer bg-green-600 text-white rounded-md py-2"
                    onClick={() => handleActionClick("unrestrict", row)}
                  >
                    UnRestrict
                  </button>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </td>
      ),
    },
  ];

  if (isFetching) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Sessions</h2>
      {sessionss && (
        <ReusableTable
          tableTitle="Tutor Sessions"
          columns={columns}
          data={sessionss?.data}
          searchPlaceholder="Search Session"
          // onActionClick={handleActionClick}
        />
      )}

      <ActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        actionType={modalAction}
        data={modalAction === "view" ? sessionDetails : selectedData}
        onConfirm={handleConfirm}
        loading={loadingDetails || deleteMut.isPending || restrictMut.isPending}
        isDetailsLoading={loadingDetails}
      />
    </div>
  );
};

export default SessionTable;
