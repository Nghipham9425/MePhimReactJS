import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function MovieCard({ movie, onMouseEnter, onMouseLeave }) {
  const navigate = useNavigate();
  const IMAGE_DOMAIN = "https://phimimg.com/";
  return (
    <div
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate(`/movie/${movie.slug}`)}

    >
      <img
        src={
          movie.poster_url
            ? `https://phimapi.com/image.php?url=${encodeURIComponent(
              movie.poster_url.startsWith('http')
                ? movie.poster_url
                : IMAGE_DOMAIN + movie.poster_url
            )}`
            : '/no-image.png'
        }
        alt={movie.name}
        className='w-full h-64 object-cover'
        onError={e => { e.target.onerror = null; e.target.src = '/no-image.png'; }}
      />
      <div className='p-4'>
        <h3 className='text-white text-sm font-semibold truncate mb-2'>{movie.name}</h3>
        <p className='text-gray-400 text-xs mb-1'>{movie.origin_name}</p>
        <p className='text-gray-500 text-xs'>{movie.year}</p>
      </div>
    </div>
  )
}