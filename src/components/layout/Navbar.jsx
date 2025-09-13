import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchCategoriesAPI, fetchCountriesAPI } from '../../api'
import {
  MagnifyingGlassIcon,
  UserIcon,
  BellIcon,
  ChevronDownIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'

function Navbar() {
  const [state, setState] = useState({
    keyword: '', scrolled: false, menuOpen: false,
    genreOpen: false, countryOpen: false,
    categories: [], countries: []
  })

  const navigate = useNavigate()

  const onProfileClick = () => {
    navigate("/profile")
  }

  const { pathname } = useLocation()
  const isHeroPage = pathname === '/' || pathname.startsWith('/movie/')

  useEffect(() => {
    Promise.all([fetchCategoriesAPI(), fetchCountriesAPI()])
      .then(([catRes, countRes]) => setState(prev => ({
        ...prev,
        categories: catRes.data?.data?.slice(0, 15) || [],
        countries: countRes.data?.data?.slice(0, 12) || []
      })))
      .catch(console.error)

    if (!isHeroPage) return setState(prev => ({ ...prev, scrolled: true }))
    const handleScroll = () => setState(prev => ({ ...prev, scrolled: window.scrollY > 40 }))
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHeroPage])

  const update = (updates) => setState(prev => ({ ...prev, ...updates }))
  const handleSearch = (e) => {
    e.preventDefault()
    if (state.keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(state.keyword.trim())}`)
      update({ keyword: '', menuOpen: false })
    }
  }

  const navBg = isHeroPage ? (state.scrolled ? 'bg-black/90' : 'bg-transparent') : 'bg-black/90'

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 transition-colors duration-300 ${navBg}`}>

      {/* Logo */}
      <div className="font-extrabold text-2xl tracking-widest text-red-600 select-none cursor-pointer" onClick={() => navigate('/')}>
        MePhim
      </div>

      {/* Hamburger */}
      <button className="md:hidden text-white" onClick={() => update({ menuOpen: !state.menuOpen })}>
        <Bars3Icon className="w-7 h-7" />
      </button>

      {/* Menu */}
      <ul className={`fixed md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent flex-col md:flex-row gap-2 md:gap-8 uppercase font-semibold text-sm transition-all duration-300 z-40 ${state.menuOpen ? 'flex' : 'hidden md:flex'}`}>

        {/* Home */}
        <NavItem onClick={() => { navigate('/'); update({ menuOpen: false }) }}>
          Trang chủ
        </NavItem>

        {/* Genre Dropdown */}
        <NavDropdown
          title="Thể loại"
          isOpen={state.genreOpen}
          items={state.categories}
          onToggle={() => update({ genreOpen: !state.genreOpen, countryOpen: false })}
          onItemClick={(slug) => { navigate(`/category/${slug}`); update({ genreOpen: false, menuOpen: false }) }}
          width="md:w-96"
        />

        {/* Country Dropdown */}
        <NavDropdown
          title="Quốc gia"
          isOpen={state.countryOpen}
          items={state.countries}
          onToggle={() => update({ countryOpen: !state.countryOpen, genreOpen: false })}
          onItemClick={(slug) => { navigate(`/country/${slug}`); update({ countryOpen: false, menuOpen: false }) }}
          width="md:w-80"
        />

        {/* Danh sách phát */}
        <NavItem onClick={() => { navigate('/playlist'); update({ menuOpen: false }) }}>
          Danh sách phát
        </NavItem>

        {/* Mobile Search */}
        <li className="block md:hidden px-4 py-3 mt-2 border-t border-gray-700">
          <SearchForm keyword={state.keyword} onChange={(keyword) => update({ keyword })} onSubmit={handleSearch} />
        </li>
      </ul>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <SearchForm keyword={state.keyword} onChange={(keyword) => update({ keyword })} onSubmit={handleSearch} />
        <UserActions onProfileClick={onProfileClick} />
      </div>
    </nav>
  )
}

const NavItem = ({ children, onClick }) => (
  <li className='cursor-pointer hover:text-red-500 text-white px-4 py-2 md:p-0' onClick={onClick}>
    {children}
  </li>
)

const NavDropdown = ({ title, isOpen, items, onToggle, onItemClick, width }) => (
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

const SearchForm = ({ keyword, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="relative">
    <input
      type="text"
      placeholder="Tìm phim..."
      value={keyword}
      onChange={e => onChange(e.target.value)}
      className="w-64 px-4 py-2 pr-10 rounded-lg bg-transparent text-white outline-none focus:ring-2 focus:ring-red-500 border border-gray-700 focus:border-red-500 transition-all duration-300"
    />
    <button
      type="submit"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
    >
      <MagnifyingGlassIcon className="w-5 h-5" />
    </button>
  </form>
)

const UserActions = ({ onProfileClick }) => (
  <div className="flex items-center gap-2">
    {/* Notification */}
    <button className="relative p-1.5 text-white hover:text-red-500 transition-colors">
      <BellIcon className="w-5 h-5" />
      <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
        3
      </span>
    </button>

    {/* Profile Avatar */}
    <button
      onClick={onProfileClick}
      className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center font-bold text-white cursor-pointer hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-red-500/25 ml-1"
    >
      KDB
    </button>
  </div>
)


export default Navbar