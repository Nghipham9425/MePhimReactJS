import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const genres = [
  { name: "Hành Động", slug: "hanh-dong" },
  { name: "Kinh Dị", slug: "kinh-di" },
  { name: "Tình Cảm", slug: "tinh-cam" },
  { name: "Hài Hước", slug: "hai-huoc" },
  { name: "Hoạt Hình", slug: "hoat-hinh" },
  { name: "Viễn Tưởng", slug: "vien-tuong" },
  { name: "Phiêu Lưu", slug: "phieu-luu" },
  { name: "Chính Kịch", slug: "chinh-kich" },
  { name: "Cổ Trang", slug: "co-trang" },
  { name: "Võ Thuật", slug: "vo-thuat" },
  { name: "Tâm Lý", slug: "tam-ly" },
  { name: "Gia Đình", slug: "gia-dinh" },
  { name: "Học Đường", slug: "hoc-duong" },
  { name: "Trẻ Em", slug: "tre-em" },
  { name: "Thể Thao", slug: "the-thao" }
];

function Navbar() {
  const [keyword, setKeyword] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHeroPage = location.pathname === '/' || location.pathname.startsWith('/movie/');

  useEffect(() => {
    if (!isHeroPage) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeroPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
      setKeyword('');
      setMenuOpen(false);
    }
  };

  const navBg = isHeroPage ? (scrolled ? 'bg-black/90' : 'bg-transparent') : 'bg-black/90';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 transition-colors duration-300 ${navBg}`}>
      {/* Logo */}
      <div className="font-extrabold text-2xl tracking-widest text-red-600 select-none cursor-pointer"
        onClick={() => navigate('/')}>
        MePhim
      </div>

      {/* Hamburger */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menu */}
      <ul className={`fixed md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent flex-col md:flex-row gap-2 md:gap-8 uppercase font-semibold text-sm transition-all duration-300 z-40 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>

        <li className='cursor-pointer hover:text-red-500 text-white px-4 py-2 md:p-0'
          onClick={() => { navigate('/'); setMenuOpen(false); }}>
          Trang chủ
        </li>

        {/* Genre Dropdown */}
        <li className='relative cursor-pointer hover:text-red-500 text-white px-4 py-2 md:p-0'
          onMouseEnter={() => setGenreOpen(true)}
          onMouseLeave={() => setGenreOpen(false)}
          onClick={() => setGenreOpen(!genreOpen)}>

          <div className="flex items-center justify-between md:justify-start">
            Thể loại
            <svg className={`w-4 h-4 ml-1 transform transition-transform md:hidden ${genreOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {genreOpen && (
            <ul className="mt-2 md:absolute md:left-0 md:top-full md:mt-1 md:w-96 bg-gray-800 md:bg-gray-900 rounded-lg md:rounded-xl shadow-2xl border border-gray-700 z-30 grid grid-cols-2 md:grid-cols-3 gap-1 p-2 max-h-60 md:max-h-80 overflow-y-auto">
              {genres.map(genre => (
                <li
                  key={genre.slug}
                  className="px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-white hover:bg-gray-700 hover:text-red-500 cursor-pointer rounded transition-colors whitespace-nowrap"
                  onClick={() => {
                    navigate(`/genre?genre=${genre.slug}`);
                    setGenreOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li className='cursor-pointer hover:text-red-500 text-white px-4 py-2 md:p-0'>Quốc gia</li>
        <li className="hover:text-red-500 cursor-pointer text-white px-4 py-2 md:p-0">Danh sách phát</li>

        {/* Mobile Search */}
        <li className="block md:hidden px-4 py-3 mt-2 border-t border-gray-700">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Tìm phim..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              className="px-3 py-1 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500 flex-1"
            />
            <button type="submit" className="text-white hover:text-red-500 ml-2 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>
        </li>
      </ul>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Tìm phim..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="px-3 py-1 rounded bg-gray-800 text-white outline-none focus:ring-2 focus:ring-red-500"
          />
          <button type="submit" className="text-white hover:text-red-500 ml-2 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </form>

        <button className="text-white hover:text-red-500 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>

        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-red-500 cursor-pointer">
          KDB
        </div>
      </div>
    </nav>
  );
}

export default Navbar;