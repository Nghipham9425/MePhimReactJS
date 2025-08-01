import React, { useEffect, useState } from 'react';

function Banner({ movie }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timeout);
  }, [movie]);

  if (!movie) return null;
  return (
    <div
      className={`relative h-[400px] w-full flex items-end bg-cover bg-center mb-8 rounded-xl overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ backgroundImage: `url(${movie.thumb_url})` }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      {/* Nội dung banner */}
      <div className="relative z-12 p-8 text-white max-w-2xl">
        <h2 className="text-4xl font-extrabold mb-2 drop-shadow">{movie.name}</h2>
        <p className="mb-4 text-gray-200">{movie.origin_name}</p>
        <div className="flex gap-4">
          <button className="bg-red-600 px-6 py-2 rounded font-bold hover:bg-red-700 transition">Xem</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
