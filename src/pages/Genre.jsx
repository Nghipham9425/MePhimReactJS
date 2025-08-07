import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesByGenre } from '../api/phimApi';
import MovieSection from '../components/MovieSection';
import Loading from '../components/Loading';

function Genre() {
  const [searchParams] = useSearchParams();
  const genreSlug = searchParams.get('genre');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  if (loading) return <Loading />;



  return (
    <div className="bg-black min-h-screen pt-20 px-4 md:px-8">
      <div className="px-4 mb-6 flex gap-4">
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

      <MovieSection title={`Phim thể loại: ${genreName}`} movies={movies} grid />
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
    </div>
  );
}

export default Genre;