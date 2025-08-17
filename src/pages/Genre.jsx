import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getMoviesByGenre } from '../api/phimApi';
import MovieSection from '../components/MovieSection';
import Loading from '../components/common/Loading';
import Pagination from '../components/pagination/Pagination';

function Genre() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const genreSlug = searchParams.get('genre');
  const pageParam = parseInt(searchParams.get('page')) || 1;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [genreName, setGenreName] = useState("");
  const [sortField, setSortField] = useState("modified.time");
  const [sortType, setSortType] = useState("desc");

  const getGenreDisplayName = (slug) => {
    const genreMap = {
      'hanh-dong': 'Hành Động',
      'mien-tay': 'Miền Tây',
      'tre-em': 'Trẻ Em',
      'lich-su': 'Lịch Sử',
      'co-trang': 'Cổ Trang',
      'chien-tranh': 'Chiến Tranh',
      'vien-tuong': 'Viễn Tưởng',
      'kinh-di': 'Kinh Dị',
      'tai-lieu': 'Tài Liệu',
      'bi-an': 'Bí Ẩn',
      'phim-18': 'Phim 18+',
      'tinh-cam': 'Tình Cảm',
      'tam-ly': 'Tâm Lý',
      'the-thao': 'Thể Thao',
      'phieu-luu': 'Phiêu Lưu',
      'am-nhac': 'Âm Nhạc',
      'gia-dinh': 'Gia Đình',
      'hoc-duong': 'Học Đường',
      'hai-huoc': 'Hài Hước',
      'hinh-su': 'Hình Sự',
      'vo-thuat': 'Võ Thuật',
      'khoa-hoc': 'Khoa Học',
      'than-thoai': 'Thần Thoại',
      'chinh-kich': 'Chính Kịch',
      'kinh-dien': 'Kinh Điển'
    };
    return genreMap[slug] || slug;
  };

  useEffect(() => {
    if (genreSlug) {
      setGenreName(getGenreDisplayName(genreSlug));
    }
  }, [genreSlug]);

  const sortLang = "";
  const country = "";
  const year = "";

  useEffect(() => {
    if (genreSlug) {
      setLoading(true);
      getMoviesByGenre(
        genreSlug,
        currentPage,
        sortField,
        sortType,
        sortLang,
        country,
        year
      ).then(res => {
        setMovies(res.data.data?.items || []);
        setTotalPages(res.data.data?.params?.pagination?.totalPages || 1);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [genreSlug, currentPage, sortField, sortType]);


  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  // Khi đổi trang, cập nhật URL
  const handlePageChange = (newPage) => {
    navigate(`/genre?genre=${genreSlug}&page=${newPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-black min-h-screen pt-20 px-4 md:px-8">
      <FilterControls
        sortField={sortField}
        setSortField={setSortField}
        sortType={sortType}
        setSortType={setSortType}
      />
      <MovieSection title={`Phim thể loại: ${genreName}`} movies={movies} grid loading={loading} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Genre;