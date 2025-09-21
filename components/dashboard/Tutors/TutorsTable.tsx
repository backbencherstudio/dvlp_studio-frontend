"use client";

import React, { useState } from "react";
import ReusableTable from "@/components/reusable/ReusableTable";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

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
  // Add more data here...
];

const TutorTable = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null); // Store open dropdown index

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown visibility
  };

  const handleActionClick = (action: string, rowData: any) => {
    console.log(action, rowData);
    // You can implement action-specific behavior here
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
      label: "Action2",
      renderRow: (row: any, index: number) => (
        <td className=" text-sm text-gray-600 relative">
          <div className="flex gap-2 items-center">
            <Link
              href={`/admin-dashboard/tutors/${row.session_id}`}
              className="text-blue-500 px-2 py-1.5 rounded-md border border-gray-200 cursor-pointer"
              // onClick={() => handleActionClick("View", row)} // View action
            >
              View
            </Link>
            {row.session_id == "1001" && (
              <div>
                <button
                  className="text-blue-500 p-1.5 rounded-md border border-gray-200 cursor-pointer"
                  onClick={() => handleDropdownToggle(index)} // Toggle dropdown on ellipsis click
                >
                  <EllipsisVertical />
                </button>
              </div>
            )}
          </div>

          {/* Dropdown menu */}
          {openDropdown === index && (
            <div className="p-2 space-y-2 absolute z-50 top-0 left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                className="w-full bg-black text-white rounded-md py-2"
                onClick={() => handleActionClick("Delete", row)} // Delete action
              >
                Delete
              </button>
              <button
                className="w-full bg-red-400 text-white rounded-md py-2"
                onClick={() => handleActionClick("Restrict", row)} // Restrict action
              >
                Restrict
              </button>
            </div>
          )}
        </td>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Tutors</h2>
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
