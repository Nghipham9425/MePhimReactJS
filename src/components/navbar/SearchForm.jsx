import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchForm = ({ keyword, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        type="text"
        placeholder="Tìm phim..."
        value={keyword}
        onChange={e => onChange(e.target.value)}
        className="w-64 px-4 py-2 pr-10 rounded-lg bg-gray-800/50 text-white outline-none focus:ring-2 focus:ring-red-500 border border-gray-700 focus:border-red-500 transition-all duration-300"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
    </form>
  )
}

export default SearchForm