import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const NavDropdown = ({ title, isOpen, items, onToggle, onItemClick, width }) => {
  return (
    <li className='relative cursor-pointer hover:text-red-500 text-white px-4 py-2 md:p-0' onClick={onToggle}>
      <div className="flex items-center justify-between md:justify-start">
        {title}
        <ChevronDownIcon className={`w-4 h-4 ml-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <ul className={`mt-2 md:absolute md:left-0 md:top-full md:mt-1 ${width} bg-gray-800 md:bg-gray-900 rounded-lg md:rounded-xl shadow-2xl border border-gray-700 z-30 grid grid-cols-2 md:grid-cols-3 gap-1 p-2 max-h-60 md:max-h-80 overflow-y-auto`}>
          {items.map(item => (
            <li key={item.slug} className="px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-white hover:bg-gray-700 hover:text-red-500 cursor-pointer rounded transition-colors whitespace-nowrap" onClick={() => onItemClick(item.slug)}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default NavDropdown