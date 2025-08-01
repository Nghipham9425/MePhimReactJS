import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const IMAGE_DOMAIN = "https://phimimg.com/";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const q = query.get('q');
  const pageParam = parseInt(query.get('page')) || 1;
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(pageParam);
  }, [pageParam, q]);

  useEffect(() => {
    if (q) {
      axios
        .get(`https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(q)}&page=${page}&limit=20`)
        .then(res => {
          setResults(res.data.data.items || []);
          setTotalPages(res.data.data.params?.pagination?.totalPages || 1);
        });
    }
  }, [q, page]);

  const handlePageChange = (newPage) => {
    navigate(`/search?q=${encodeURIComponent(q)}&page=${newPage}`);
  };

  return (
    <div className="bg-black min-h-screen text-white p-8 pt-24">
      <h2 className="text-2xl font-bold mb-4">Kết quả cho: "{q}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {results.map(movie => (
          <div
            key={movie._id}
            className="bg-gray-900 rounded p-2 cursor-pointer hover:bg-red-700 transition"
            onClick={() => navigate(`/movie/${movie.slug}`)}
          >
            <img
              src={
                movie.poster_url
                  ? `https://phimapi.com/image.php?url=${encodeURIComponent(
                    movie.poster_url.startsWith('http')
                      ? movie.poster_url
                      : IMAGE_DOMAIN + movie.poster_url
                  )}`
                  : '/no-image.png'
              }
              alt={movie.name}
              className="w-full h-60 object-cover rounded"
              onError={e => { e.target.onerror = null; e.target.src = '/no-image.png'; }}
            />
            <div className="mt-2 font-bold">{movie.name}</div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-3 py-1 bg-gray-700 rounded hover:bg-red-600 disabled:opacity-50"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Trang trước
          </button>
          <span className="px-3 py-1">{page} / {totalPages}</span>
          <button
            className="px-3 py-1 bg-gray-700 rounded hover:bg-red-600 disabled:opacity-50"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Trang sau
          </button>
        </div>
      )}
      {results.length === 0 && <div className="text-gray-400 mt-8">Không tìm thấy phim nào.</div>}
    </div>
  );
}

export default Search;