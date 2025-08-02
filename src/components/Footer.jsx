import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-black/90 text-white py-10">
      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.12a7.5 7.5 0 0 1 15 0A17.93 17.93 0 0 1 12 21.75c-2.68 0-5.22-.58-7.5-1.63Z" />
            </svg>
            <h2 className="text-lg font-bold">Về tôi</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Trang web xem phim cá nhân, phục vụ cho học tập. <br /> Không dùng cho mục đích thương mại.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-6 0V6m12 12V6" />
            </svg>
            <h2 className="text-lg font-bold">Tài nguyên học tập</h2>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><a href="https://react.dev/" target="_blank" rel="noreferrer" className="hover:text-red-400 transition font-medium">ReactJS</a></li>
            <li><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer" className="hover:text-red-400 transition font-medium">Tailwind CSS</a></li>
            <li><a href="https://vitejs.dev/" target="_blank" rel="noreferrer" className="hover:text-red-400 transition font-medium">Vite</a></li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 1 0 0 12.728M12 9v3m0 3h.01" />
            </svg>
            <h2 className="text-lg font-bold">Hỗ trợ</h2>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><a href="#" className="hover:text-red-400 transition font-medium">Liên hệ</a></li>
            <li><a href="#" className="hover:text-red-400 transition font-medium">Báo lỗi</a></li>
            <li><a href="#" className="hover:text-red-400 transition font-medium">Câu hỏi thường gặp</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-gray-400">
        © 2025 - Website học tập. Không sử dụng cho mục đích thương mại.
      </div>
    </footer>
  );
}

export default Footer;
