import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from '../api/phimApi';
import MovieCard from '../components/common/MovieCard';
import Loading from '../components/common/Loading';
import Pagination from '../components/pagination/Pagination';

function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  const pageParam = parseInt(searchParams.get('page')) || 1;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(pageParam);
  }, [pageParam, q]);

  useEffect(() => {
    if (q && q.trim()) {
      setLoading(true);
      searchMovies(q.trim(), page)
        .then(res => {
          const data = res.data.data;
          setResults(data?.items || []);
          setTotalPages(data?.params?.pagination?.totalPages || 1);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    }
  }, [q, page]);

  const handlePageChange = (newPage) => {
    navigate(`/search?q=${encodeURIComponent(q)}&page=${newPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;

  if (!q?.trim()) {
    return (
      <div className="bg-black min-h-screen text-white pt-20">
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-400 mb-4">Vui lòng nhập từ khóa tìm kiếm</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            Kết quả tìm kiếm: "{q}"
          </h1>
          <p className="text-gray-400 text-sm">
            Tìm thấy {results.length} kết quả
          </p>
        </div>

        {results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-8">
              {results.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-400 mb-4">Không tìm thấy kết quả nào</h3>
            <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;