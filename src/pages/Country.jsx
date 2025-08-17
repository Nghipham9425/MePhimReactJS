import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { getMoviesByCountry } from '../api/phimApi';
import MovieSection from '../components/MovieSection';
import Loading from '../components/common/Loading';
import Pagination from '../components/pagination/Pagination';
import FilterControls from '../components/filters/FilterControls';

function Country() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Thêm dòng này
  const countrySlug = searchParams.get('country');
  const countryName = searchParams.get('name') || countrySlug;
  const pageParam = parseInt(searchParams.get('page')) || 1; // Thêm dòng này
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageParam); // Sửa lại dùng pageParam
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("modified.time");
  const [sortType, setSortType] = useState("desc");

  useEffect(() => {
    setCurrentPage(pageParam); // Khi URL đổi page thì cập nhật lại state
  }, [pageParam]);

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
        setTotalItems(res.data.data?.params?.pagination?.totalItems || 0);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [countrySlug, currentPage, sortField, sortType]);

  // Khi đổi trang, cập nhật URL
  const handlePageChange = (newPage) => {
    navigate(`/country?country=${countrySlug}&name=${countryName}&page=${newPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-black min-h-screen pt-20">
      <div className="px-4 md:px-8">
        <FilterControls
          sortField={sortField}
          setSortField={setSortField}
          sortType={sortType}
          setSortType={setSortType}
        />

        {/* Total count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Tìm thấy <span className="text-white font-semibold">{totalItems}</span> bộ phim từ {countryName}
          </p>
        </div>

        {/* Movies */}
        <MovieSection title={`Phim ${countryName}`} movies={movies} grid loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default Country;