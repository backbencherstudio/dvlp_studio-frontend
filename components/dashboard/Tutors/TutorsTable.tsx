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

const TutorData = [
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
  {
    session_id: "1001",
    name: "Marvin McKinney",
    subject: "FRENCH",
    hourly_rate: "$25/hr",
    status: "Active",
    location: "China",
  },
  {
    session_id: "1002",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Inactive",
    location: "USA",
  },
  {
    session_id: "1003",
    name: "Sarah Wilson",
    subject: "MATH",
    hourly_rate: "$30/hr",
    status: "Active",
    location: "USA",
  },
];

const TutorTable = () => {
  // store which row popover is open
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleActionClick = (action: string, rowData: any) => {
    console.log(action, rowData);
    // do your API calls or logic here

    // ✅ close the popover after action
    setOpenIndex(null);
  };

  const columns = [
    { id: "session_id", label: "SESSION ID" },
    { id: "name", label: "NAME" },
    { id: "subject", label: "SUBJECT" },
    { id: "hourly_rate", label: "HOURLY RATE" },
    { id: "status", label: "STATUS" },
    { id: "location", label: "LOCATION" },
    {
      id: "action2",
      label: "Action",
      renderRow: (row: any, index: number) => (
        <td className="text-sm text-gray-600">
          <div className="flex gap-2 items-center">
            <Link
              href={`/admin-dashboard/tutors/${row.session_id}`}
              className="text-blue-500 px-2 py-1.5 rounded-md border border-gray-200 cursor-pointer"
            >
              View
            </Link>

            {row.session_id === "1001" && (
              <Popover
                open={openIndex === index}
                onOpenChange={(isOpen) =>
                  setOpenIndex(isOpen ? index : null)
                }
              >
                <PopoverTrigger asChild>
                  <button className="text-blue-500 p-1.5 rounded-md border border-gray-200 cursor-pointer">
                    <EllipsisVertical />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-28 p-2 space-y-2 mr-12">
                  <button
                    className="w-full bg-black text-white rounded-md py-2"
                    onClick={() => handleActionClick("Delete", row)}
                  >
                    Delete
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
      {/* <h2 className="text-2xl font-bold mb-6">Tutors</h2> */}
      <ReusableTable
        tableTitle="Tutors Applications"
        columns={columns}
        data={TutorData}
        searchPlaceholder="Search Tutor"
        onActionClick={handleActionClick}
      />
    </div>
  );
};

export default TutorTable;
