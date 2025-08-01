import React, { useEffect, useState, useRef } from 'react'
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';
import { getNewMovies } from '../api/phimApi';
import Banner from '../components/Banner';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerIndex, setBannerIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    getNewMovies(1).then(response => {
      setMovies(response.data.items);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Auto slide banner
  useEffect(() => {
    if (movies.length === 0) return;
    intervalRef.current = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [movies]);

  // Khi hover vào phim
  const handleMouseEnter = (idx) => {
    clearInterval(intervalRef.current);
    setBannerIndex(idx);
  };

  // Khi rời chuột khỏi phim
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % movies.length);
    }, 5000);
  };

  if (loading) return <Loading />

  return (
    <div className='bg-black min-h-screen p-4'>
      <Banner movie={movies[bannerIndex]} />
      <h1 className="text-white text-2xl font-bold mb-6">Phim mới cập nhật</h1>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700">
        {movies.map((movie, idx) => (
          <div key={movie._id} className="min-w-[180px] max-w-[180px] flex-shrink-0">
            <MovieCard
              movie={movie}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        ))}
      </div>
    </div>

  )
}

export default Home