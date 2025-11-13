"use client";

import React, { useState } from "react";
import ReusableTable from "@/components/reusable/ReusableTable";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
// import { transformApiData, useTeachers, useTeachersMutations } from "./useTutors";
import { is, se } from "date-fns/locale";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import {
  transformStudentApiData,
  useStudents,
  useStudentsMutations,
} from "./useStudent";
import RestrictModal, { RestrictFormData } from "../RestrictModal";
import StatusBadge from "@/components/common/StatusBadge";

const StudentTable = () => {
  // store which row popover is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showRestrictModal, setShowRestrictModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);

  const { data: tData, isError, isLoading } = useStudents();
  const { deleteMut, restrictMut, unRestrictMut } = useStudentsMutations();

  const studentsData = tData?.data || [];



  const handleRestrictClick = (row: any) => {
    setSelectedTutor(row);
    setShowRestrictModal(true);
    setOpenIndex(null);
  };

  console.log("selected Student", selectedTutor);

  const handleRestrictSubmit = (formData: RestrictFormData) => {
    console.log("Restricting student:", selectedTutor, "with data:", formData);
    restrictMut.mutate({
      id: selectedTutor?.id,
      payload: {
        restriction_period: formData.restriction_period,
        restriction_reason: formData.restriction_reason,
      },
    });
  };

  const handleActionClick = (action: string, rowData: any) => {
    console.log(action, rowData);
    // API calls or logic here
    if (action === "Delete") {
      deleteMut.mutate(rowData.id);
    } else if (action === "UnRestrict") {
      unRestrictMut.mutate(rowData.id);
    }
    //  close the popover after action
    setOpenIndex(null);
  };

  const columns = [
    { id: "id", label: "Student ID" },
    { id: "name", label: "NAME" },
    { id: "email", label: "Email" },
    { id: "grade_level", label: "Grade Level" },
    {
      id: "status",
      label: "STATUS",
      renderRow: (row: any) => {
        return (
          <StatusBadge status={row.status} />

        );
      },
    },
    { id: "adress", label: "LOCATION" },
    {
      id: "action2",
      label: "Action",
      renderRow: (row: any, index: number) => (
        <td className="text-sm text-gray-600">
          <div className="flex gap-2 items-center">
            <Link
              href={`/admin-dashboard/students/${row.id}`}
              className="text-blue-500 px-2 py-1.5 rounded-md border border-gray-200 cursor-pointer"
            >
              View
            </Link>

            {
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
                    className="w-full bg-black text-white rounded-md py-2 cursor-pointer"
                    onClick={() => handleActionClick("Delete", row)}
                  >
                    Delete
                  </button>
                  {row.status === 0 ? (
                    <button
                      className="w-full bg-green-500 text-white rounded-md py-2 cursor-pointer"
                      onClick={() => handleActionClick("UnRestrict", row)}
                    >
                      UnRestrict
                    </button>
                  ) : (
                    <button
                      className="w-full bg-red-400 text-white rounded-md py-2 cursor-pointer"
                      onClick={() => handleRestrictClick(row)}
                    >
                      Restrict
                    </button>
                  )}
                </PopoverContent>
              </Popover>
            }
          </div>
        </td>
      ),
    },
  ];

  return (
    <div className="p-6">
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState />
      ) : (
        <ReusableTable
          tableTitle="Students "
          columns={columns}
          data={studentsData}
          searchPlaceholder="Search Student"
          onActionClick={handleActionClick}
        />
      )}

      {/* Modal */}
      <RestrictModal
        title={"Student"}
        open={showRestrictModal}
        onClose={() => setShowRestrictModal(false)}
        onSubmit={handleRestrictSubmit}
      />
    </div>
  );
};

export default StudentTable;

