import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';
import { getNewMovies, getMoviesByGenre, getMoviesByCountry } from '../api/phimApi';
import BannerSlide from '../components/BannerSlide';
import MovieSection from '../components/MovieSection';

function Home() {
  const [movies, setMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]); // Thay thế
  const [koreanMovies, setKoreanMovies] = useState([]);
  const [historicalMovies, setHistoricalMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getNewMovies(1),
      getMoviesByGenre('hanh-dong', 1), // Lấy phim hành động
      getMoviesByCountry('han-quoc', 1),
      getMoviesByGenre('co-trang', 1)
    ]).then(([newRes, actionRes, koreanRes, historicalRes]) => {
      setMovies(newRes.data.items || []);
      setActionMovies(actionRes.data.data?.items || []);
      setKoreanMovies(koreanRes.data.data?.items || []);
      setHistoricalMovies(historicalRes.data.data?.items || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading />

  const featuredMovies = movies.slice(0, 7);

  return (
    <div className='bg-black min-h-screen'>
      <BannerSlide movies={featuredMovies} overlapNav />
      <div className="px-0">
        <MovieSection title="Phim mới cập nhật" movies={movies.slice(0, 10)} />
        <MovieSection title="Phim Hành Động" movies={actionMovies.slice(0, 10)} /> {/* Thay thế */}
        <MovieSection title="Phim Hàn Quốc" movies={koreanMovies.slice(0, 10)} />
        <MovieSection title="Phim cổ trang" movies={historicalMovies.slice(0, 10)} />
      </div>
    </div>
  )
}

export default Home