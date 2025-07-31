import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';
import { getNewMovies } from '../api/phimApi';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewMovies(1).then(response => {
      console.log('API response', response.data);
      setMovies(response.data.items);
      setLoading(false);
    })
      .catch(error => {
        console.error('Loi API:', error);
        setLoading(false);
      });
  }, []);
  if (loading) <return Loading />
  return (
    <div className='bg-black min-h-screen p-4'>
      <h1 className='text-white text-2xl font-bold mb-6'>Phim mới cập nhật</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {movies.map(movie =>
          <MovieCard key={movie._id} movie={movie}></MovieCard>
        )}
      </div>
    </div>
  )
}

export default Home
