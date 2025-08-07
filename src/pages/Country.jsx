import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesByCountry } from '../api/phimApi';
import MovieSection from '../components/MovieSection';
import Loading from '../components/Loading';

function Country() {
  const [searchParams] = useSearchParams();
  const countrySlug = searchParams.get('country');
  const countryName = searchParams.get('name') || countrySlug;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("modified.time");
  const [sortType, setSortType] = useState("desc");

  useEffect(() => {
    if (countrySlug) {
      setLoading(true);
      getMoviesByCountry(
        countrySlug,
        currentPage,
        sortField,
        sortType,
        ""
      ).then(res => {
        setMovies(res.data.data?.items || []);
        setTotalPages(res.data.data?.params?.pagination?.totalPages || 1);
        setTotalItems(res.data.data?.params?.pagination?.totalItems || 0); // Lấy tổng số items
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [countrySlug, currentPage, sortField, sortType]);

  if (loading) return <Loading />;

  return (
    <div className="bg-black min-h-screen pt-20">
      <div className="px-4 md:px-8">
        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="modified.time">Cập nhật mới nhất</option>
            <option value="name">Theo chữ cái (A-Z)</option>
            <option value="year">Theo năm</option>
          </select>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="desc">Giảm dần</option>
            <option value="asc">Tăng dần</option>
          </select>
        </div>

        {/* Total count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Tìm thấy <span className="text-white font-semibold">{totalItems}</span> bộ phim từ {countryName}
          </p>
        </div>

        {/* Movies */}
        <MovieSection title={`Phim ${countryName}`} movies={movies} grid />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 py-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Trang trước
            </button>
            <span className="text-white px-2">Trang {currentPage} / {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Country;