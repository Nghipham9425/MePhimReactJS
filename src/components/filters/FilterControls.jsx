import React from "react";

function FilterControls({
  sortField,
  setSortField,
  sortType,
  setSortType,
  year,
  setYear,
  years = []
}) {
  return (
    <div className="mb-6 flex gap-4 flex-wrap">
      <select
        value={sortField}
        onChange={e => setSortField(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded"
      >
        <option value="modified.time">Cập nhật mới nhất</option>
        <option value="name">Theo chữ cái (A-Z)</option>
        <option value="year">Theo năm</option>
      </select>
      <select
        value={sortType}
        onChange={e => setSortType(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded"
      >
        <option value="desc">Giảm dần</option>
        <option value="asc">Tăng dần</option>
      </select>
      {years.length > 0 && setYear && (
        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          <option value="">Tất cả năm</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default FilterControls;