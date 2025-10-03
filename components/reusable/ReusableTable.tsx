'use client';
import React, { useState } from "react";
import Pagination from "./Pagination";

interface TableProps {
  tableTitle?: string;
  columns: Array<{ 
    id: string; 
    label: string; 
    renderRow?: (row: any, index: number) => React.ReactNode 
  }>;
  data: Array<any>;
  searchPlaceholder: string;
  renderHeader?: (column: string) => React.ReactNode;
  showDropdown?: boolean;
}

const ReusableTable = ({
  tableTitle,
  columns,
  data,
  searchPlaceholder,
  renderHeader,
}: TableProps) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const totalItems = data.length;

  // Slice data for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      {/* Search and filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        {tableTitle && (
          <h2 className="text-xl font-semibold text-gray-800">{tableTitle}</h2>
        )}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
          />
          <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {renderHeader ? renderHeader(column.label) : column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column, idx) => (
                    <td key={idx} className="px-6 py-4 text-sm text-gray-600">
                      {column.renderRow
                        ? column.renderRow(row, startIndex + index)
                        : row[column.id] || `-`}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-8 text-center text-gray-500 text-sm"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default ReusableTable;