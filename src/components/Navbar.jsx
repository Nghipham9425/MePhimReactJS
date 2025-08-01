import React from 'react'

function Navbar() {
  return (
    <nav className="bg-black text-white flex items-center justify-between px-8 h-16 shadow-md fixed top-0 left-0 w-full z-50">
      {/* logo */}
      <div className="font-extrabold text-2xl tracking-widest text-red-600 mr-8 select-none">MEPHIM</div>
      <ul className='flex gap-8 uppercase font-semibold text-sm flex-1'>
        <li className='cursor-pointer hover:text-red-500'>Home</li>
        <li className='cursor-pointer hover:text-red-500'>Category</li>
        <li className='cursor-pointer hover:text-red-500'>Country</li>
        <li className="hover:text-red-500 cursor-pointer">My List</li>
      </ul>
      {/* Icons & Search */}
      <div className="flex items-center gap-4">
        {/* Search icon */}
        <button className="hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
        {/* Notification icon */}
        <button className="hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>
        {/* User avatar (placeholder) */}
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-red-500 cursor-pointer">
          U
        </div>
      </div>
    </nav>
  )
}

export default Navbar