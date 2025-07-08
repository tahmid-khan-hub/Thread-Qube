import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
  const pages = [];

  // Generate array of page numbers
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {/* Previous Button */}
      <button
        className="w-10 h-10 rounded border text-sm font-medium disabled:opacity-50 hover:bg-gray-200"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {pages.map((pg) => (
        <button
          key={pg}
          onClick={() => setPage(pg)}
          className={`w-10 h-10 rounded border text-sm font-medium ${
            pg === page
              ? 'bg-orange-500 text-white'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {pg}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="w-10 h-10 rounded border text-sm font-medium disabled:opacity-50 hover:bg-gray-200"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
