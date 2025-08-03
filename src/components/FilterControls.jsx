import React, { useState } from 'react';

function FilterControls({ onFilterChange, filters }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'modified.time', label: 'Cập nhật mới nhất' },
    { value: '_id', label: 'Theo ID' },
    { value: 'year', label: 'Theo năm' }
  ];

  const sortTypeOptions = [
    { value: 'desc', label: 'Giảm dần' },
    { value: 'asc', label: 'Tăng dần' }
  ];

  const langOptions = [
    { value: '', label: 'Tất cả ngôn ngữ' },
    { value: 'vietsub', label: 'Vietsub' },
    { value: 'thuyet-minh', label: 'Thuyết minh' },
    { value: 'long-tieng', label: 'Lồng tiếng' }
  ];

  return (
    <div className="mb-6 px-4">
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-4 flex items-center justify-between"
      >
        <span>Bộ lọc & sắp xếp</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter controls */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Sort Field */}
          <div className="relative">
            <label className="block text-gray-300 text-sm mb-2">Sắp xếp theo</label>
            <select
              value={filters.sortField}
              onChange={(e) => onFilterChange({ ...filters, sortField: e.target.value })}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none cursor-pointer"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-10 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Sort Type */}
          <div className="relative">
            <label className="block text-gray-300 text-sm mb-2">Thứ tự</label>
            <select
              value={filters.sortType}
              onChange={(e) => onFilterChange({ ...filters, sortType: e.target.value })}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none cursor-pointer"
            >
              {sortTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-10 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Language Filter */}
          <div className="relative">
            <label className="block text-gray-300 text-sm mb-2">Ngôn ngữ</label>
            <select
              value={filters.sortLang}
              onChange={(e) => onFilterChange({ ...filters, sortLang: e.target.value })}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none cursor-pointer"
            >
              {langOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-10 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Năm phát hành</label>
            <input
              type="number"
              placeholder="Ví dụ: 2024"
              value={filters.year}
              onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              min="1970"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        {/* Reset button */}
        <div className="mt-4">
          <button
            onClick={() => onFilterChange({
              sortField: 'modified.time',
              sortType: 'desc',
              sortLang: '',
              year: ''
            })}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterControls;
