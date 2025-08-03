import React from 'react';
import MovieCard from './MovieCard';

function MovieSection({ title, movies, grid }) {
  return (
    <div className="px-0">
      <h1 className="text-white text-2xl font-bold mb-6 px-4">{title}</h1>
      {grid ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
          {movies.map((movie) => (
            <div key={movie._id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="w-full overflow-x-auto"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="flex gap-4 pb-2 w-fit px-4">
            {movies.map((movie) => (
              <div key={movie._id} className="min-w-[180px] max-w-[180px] flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default MovieSection;