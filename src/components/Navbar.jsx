import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [keyword, setKeyword] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
      setKeyword('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 transition-colors duration-300 ${isHome ? (scrolled ? 'bg-black/90' : 'bg-transparent') : 'bg-black/90'}`}>
      {/* logo */}
      <div className="font-extrabold text-2xl tracking-widest text-red-600 mr-8 select-none">MEPHIM</div>
      {/* Hamburger icon */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Menu */}
      <ul className={`fixed md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent flex-col md:flex-row md:flex gap-8 uppercase font-semibold text-sm transition-all duration-300
        ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
        <li className='cursor-pointer hover:text-red-500 text-gray-300 px-4 py-2 md:p-0' onClick={() => { navigate('/'); setMenuOpen(false); }}>Trang chủ</li>
        <li className='cursor-pointer hover:text-red-500 text-gray-300 px-4 py-2 md:p-0'>Thể loại</li>
        <li className='cursor-pointer hover:text-red-500 text-gray-300 px-4 py-2 md:p-0'>Quốc gia</li>
        <li className="hover:text-red-500 cursor-pointer text-gray-300 px-4 py-2 md:p-0">Danh sách phát</li>
        {/* Search box (ẩn trên md, hiện ở mobile menu) */}
        <li className="block md:hidden px-4 py-2">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Tìm phim..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="px-3 py-1 rounded bg-gray-800 text-white outline-none w-full"
            />
            <button type="submit" className="hover:text-red-500 ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-100 hover:stroke-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>
        </li>
      </ul>
      {/* Search box & Icons (desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Tìm phim..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="px-3 py-1 rounded bg-gray-800 text-white outline-none"
          />
          <button type="submit" className="hover:text-red-500 ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-100 hover:stroke-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </form>
        <button className="hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-red-100 hover:stroke-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-red-500 cursor-pointer">
          KDB
        </div>
      </div>
    </nav>
  )
}

export default Navbar;