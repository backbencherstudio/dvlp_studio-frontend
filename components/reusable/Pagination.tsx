'use client';
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  // Improved page numbers with better logic
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 4) {
        // Near the beginning
        pages.push(2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end
        pages.push("...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4 w-full">
      {/* Left: Page numbers */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        <button
          className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors min-w-[40px] flex items-center justify-center"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span 
              key={`dots-${idx}`} 
              className="px-2 text-gray-500 flex items-center justify-center min-w-[40px]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(Number(page))}
              className={`px-3 py-2 rounded-lg border transition-colors min-w-[40px] flex items-center justify-center text-sm ${
                currentPage === page
                  ? "bg-gray-200  border-gray-300 font-semibold"
                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}

        <button
          className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors min-w-[40px] flex items-center justify-center"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Right: Info + dropdown */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <span className="text-sm text-gray-600 whitespace-nowrap">
          Showing {startIndex + 1} to {endIndex} of {totalItems?.toLocaleString()} entries
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">Show:</span>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
            }}
            aria-label="Items per page"
          >
            {[5, 10, 12, 20, 50].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;