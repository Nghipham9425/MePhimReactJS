import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchCategoriesAPI, fetchCountriesAPI } from '../../api'

function Navbar() {
  const [state, setState] = useState({
    keyword: '', scrolled: false, menuOpen: false,
    genreOpen: false, countryOpen: false,
    categories: [], countries: []
  })

  const navigate = useNavigate()
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
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
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
        <UserActions />
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
      <svg className={`w-4 h-4 ml-1 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
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
  <form onSubmit={onSubmit} className="flex items-center">
    <input type="text" placeholder="Tìm phim..." value={keyword} onChange={e => onChange(e.target.value)} className="px-3 py-1 rounded bg-zinc-900 text-white outline-none focus:ring-2 focus:ring-red-500 flex-1" />
    <button type="submit" className="text-white hover:text-red-500 ml-2 transition-colors">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </button>
  </form>
)

const UserActions = () => (
  <>
    <button className="text-white hover:text-red-500 transition-colors relative">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
    </button>
    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-red-500 cursor-pointer hover:bg-gray-600 transition-colors">
      KDB
    </div>
  </>
)

export default Navbar