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
import { useApplications, useTutorApplicationActions } from "./useApplication";
import Breadcrumb from "@/components/reusable/Breadcrumb";
import ErrorState from "@/components/common/ErrorState";
import LoadingState from "@/components/common/LoadingState";



const formatTutorApplications = (apiData: any[] = []) => {
  return apiData.map((item: any) => ({
    application_id: item.id,
    name: item.name || "N/A",
    subject: Array.isArray(item.subjects_taught)
      ? item.subjects_taught.join(", ").replaceAll('"', "")
      : item.subjects_taught || "N/A",
    email: item.email || "N/A",
    hourly_rate: item.hourly_rate ? `$${item.hourly_rate}` : "N/A",
    status: item.is_accepted || "pending",
    location: item.city || item.country || "N/A",
    certifications: item.certifications || [],
  }));
};

const statusStyles: Record<string, string> = {
  approved: "bg-green-100 text-green-800",
  restricted: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};


const TutorApplicationTable = () => {
  const { data: tData, isLoading, isError } = useApplications();
  const { approveMutation, rejectMutation } = useTutorApplicationActions();

  const formattedData = formatTutorApplications(tData?.data || []);
  console.log("Formatted Data", formattedData);


  // store which row popover is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleActionClick = (action: string, rowData: any) => {
    console.log(action, rowData);
    // do your API calls or logic here
    if (action === "Approve") {
      approveMutation.mutate(rowData.application_id);
    } else if (action === "Restrict") {
      rejectMutation.mutate(rowData.application_id);
    }

    // ✅ close the popover after action
    setOpenIndex(null);
  };

  const columns = [
    { id: "application_id", label: "A. ID" },
    { id: "name", label: "NAME" },
    { id: "subject", label: "SUBJECT" },
    { id: "email", label: "Email" },
    { id: "hourly_rate", label: "HOURLY RATE" },
    {
      id: "status", label: "STATUS", renderRow: (row: any) => (
        <td>
          <span className={`px-3 py-1 rounded-full capitalize text-sm font-medium ${statusStyles[row.status] || "bg-gray-100 text-gray-800"}`}>
            {row.status}
          </span>
        </td>
      )
    },
    { id: "location", label: "LOCATION" },
    {
      id: "action2",
      label: "Action",
      renderRow: (row: any, index: number) => (
        <td className="text-sm text-gray-600">
          <div className="flex gap-2 items-center">
            <Link
              href={`/admin-dashboard/tutors/${row.application_id}`}
              className="text-blue-500 px-2 py-1.5 rounded-md border border-gray-200 cursor-pointer"
            >
              View
            </Link>

            {(
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
                    className="w-full bg-black text-white rounded-md py-2"
                    onClick={() => handleActionClick("Approve", row)}
                  >
                    Approve
                  </button>
                  <button
                    className="w-full bg-red-400 text-white rounded-md py-2"
                    onClick={() => handleActionClick("Restrict", row)}
                  >
                    Restrict
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </td>
      ),
    },
  ];





  return (
    <div className="p-6">
      {/* breadcrumb */}

      <Breadcrumb />
      {/* table  */}
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState />
      ) : (
        <ReusableTable
          tableTitle="Tutors Applications"
          columns={columns}
          data={formattedData}
          searchPlaceholder="Search Tutor"
        />
      )}
    </div>
  );
};

export default TutorApplicationTable;
