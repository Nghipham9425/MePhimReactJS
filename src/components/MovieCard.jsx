import React from 'react'
import { useNavigate } from 'react-router-dom';
import he from 'he';

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
          movie.thumb_url
            ? `https://phimapi.com/image.php?url=${encodeURIComponent(
              movie.thumb_url.startsWith('http')
                ? movie.thumb_url
                : IMAGE_DOMAIN + movie.thumb_url
            )}`
            : '/no-image.png'
        }
        alt={he.decode(movie.name)}
        className='w-full h-64 object-cover'
        onError={e => { e.target.onerror = null; e.target.src = '/no-image.png'; }}
      />
      <div className='p-4'>
        <h3 className='text-white text-sm font-semibold truncate mb-2'>{he.decode(movie.name)}</h3>
        <p className='text-gray-400 text-xs mb-1'>{movie.origin_name ? he.decode(movie.origin_name) : ''}</p>
        <p className='text-gray-500 text-xs'>{movie.year}</p>
      </div>
    </div>
  )
}