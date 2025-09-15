import React from 'react'

const NavItem = ({ children, onClick }) => {
  return (
    <li className='cursor-pointer hover:text-red-500 text-white px-4 py-2 md:p-0 transition-colors' onClick={onClick}>
      {children}
    </li>
  )
}

export default NavItem