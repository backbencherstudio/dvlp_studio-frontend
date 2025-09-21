// ReusableTable.tsx
'use client';
import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";

interface TableProps {
  tableTitle?: string;
  columns: Array<{ id: string; label: string; renderRow?: (row: any, index: number) => React.ReactNode }>;
  data: Array<any>;
  searchPlaceholder: string;
  onActionClick: (action: string, rowData: any) => void; // Callback for handling action click
  renderRow?: (row: any) => React.ReactNode; // Render prop for row content
  renderActions?: (row: any) => React.ReactNode; // Render prop for dropdown actions
  renderHeader?: (column: string) => React.ReactNode; // Render prop for column headers
  showDropdown?: boolean; // Optional: Whether to show the dropdown or not
}

const ReusableTable = ({
  tableTitle,
  columns,
  data,
  searchPlaceholder,
  renderHeader,
  showDropdown = true,
}: TableProps) => {
  



  return (
    <div className="bg-white p-4 rounded-xl">
      {/* Search and filter */}
      <div className="flex justify-between items-center mb-4">
        <h2>{tableTitle} </h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 rounded-lg border border-gray-300"
          />
          <select className="ml-2 p-2 rounded-lg border border-gray-300">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              {columns.map((column, index) => (
                <th key={index} className="p-3 text-sm font-semibold text-gray-600">
                  {renderHeader ? renderHeader(column.label) : column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {columns.map((column, idx) => (
                  <td key={idx} className="p-3 text-sm text-gray-600">
                    {column.renderRow ? column.renderRow(row, index) : row[column.id.toLowerCase().replace(" ", "_")]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
