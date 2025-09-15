import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchCategoriesAPI, fetchCountriesAPI } from '../../api'
import { Bars3Icon } from '@heroicons/react/24/outline'
import UserActions from '../navbar/UserActions'
import SearchForm from '../navbar/SearchForm'
import AuthButtons from '../navbar/AuthButtons'
import NavDropdown from '../navbar/NavDropdown'
import NavItem from '../navbar/NavItem'

function Navbar() {
  const [state, setState] = useState({
    keyword: '', scrolled: false, menuOpen: false,
    genreOpen: false, countryOpen: false, userMenuOpen: false,
    categories: [], countries: []
  })

  const navigate = useNavigate()

  // Mock user data (sau này sẽ lấy từ AuthContext)
  const user = {
    isLoggedIn: true,
    name: 'Phạm Trung Nghị',
    email: 'nghi45397@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1611931960487-4932667079f1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }

  const onProfileClick = () => {
    navigate("/profile")
    setState(prev => ({ ...prev, userMenuOpen: false }))
  }

  const handleLogout = () => {
    console.log('Logout')
    setState(prev => ({ ...prev, userMenuOpen: false }))
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

  const navBg = isHeroPage ? (state.scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent') : 'bg-black/90 backdrop-blur-md'

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
          onToggle={() => update({ genreOpen: !state.genreOpen, countryOpen: false, userMenuOpen: false })}
          onItemClick={(slug) => { navigate(`/category/${slug}`); update({ genreOpen: false, menuOpen: false }) }}
          width="md:w-96"
        />

        {/* Country Dropdown */}
        <NavDropdown
          title="Quốc gia"
          isOpen={state.countryOpen}
          items={state.countries}
          onToggle={() => update({ countryOpen: !state.countryOpen, genreOpen: false, userMenuOpen: false })}
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

        {user.isLoggedIn ? (
          <UserActions
            user={user}
            onProfileClick={onProfileClick}
            onLogout={handleLogout}
            isUserMenuOpen={state.userMenuOpen}
            onUserMenuToggle={() => update({ userMenuOpen: !state.userMenuOpen, genreOpen: false, countryOpen: false })}
          />
        ) : (
          <AuthButtons />
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(state.userMenuOpen || state.genreOpen || state.countryOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => update({ userMenuOpen: false, genreOpen: false, countryOpen: false })}
        />
      )}
    </nav>
  )
}





export default Navbar