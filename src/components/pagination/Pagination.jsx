import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 py-6">
      <button
        className="px-4 py-2 bg-gray-700 rounded hover:bg-red-600 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Trang trước
      </button>
      <span className="text-white px-2">Trang {currentPage} / {totalPages}</span>
      <button
        className="px-4 py-2 bg-gray-700 rounded hover:bg-red-600 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Trang sau
      </button>
    </div>
  );
}

export default Pagination;