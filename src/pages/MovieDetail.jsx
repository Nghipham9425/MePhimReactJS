import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetail } from '../api/phimApi';



function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [groupIndex, setGroupIndex] = useState(0);

  useEffect(() => {
    getMovieDetail(id).then(res => {
      setMovie(res.data.movie);
      setEpisodes(res.data.episodes || []);
    });
  }, [id]);

  if (!movie) return <div className="text-white p-8">Đang tải...</div>;

  return (
    <div className="bg-black min-h-screen text-white p-8 flex flex-col md:flex-row gap-8 pt-16">
      <img
        src={`https://phimapi.com/image.php?url=${encodeURIComponent(movie.poster_url)}`}
        alt={movie.name}
        className="h-[400px] w-auto rounded shadow-lg mb-4 md:mb-0 object-cover"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
        {/* ...các thông tin khác... */}
        <div className="mb-4">
          <span className="font-semibold">Nội dung:</span>
          <p className="text-gray-200">{decodeHtml(movie.content)}</p>
        </div>
        {/* Danh sách tập phim chia nhóm */}
        {episodes.length > 0 && episodes.map(server => {
          const groups = chunkArray(server.server_data, 20);
          return (
            <div key={server.server_name} className="mb-4">
              <div className="font-semibold mb-1">{server.server_name}</div>
              {/* Nút chọn nhóm */}
              <div className="flex gap-2 mb-2 flex-wrap">
                {groups.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGroupIndex(idx)}
                    className={`px-3 py-1 rounded text-sm font-bold transition min-w-[90px] ${groupIndex === idx
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-200 hover:bg-red-700'
                      }`}
                  >
                    {groups.length === 1
                      ? `Tất cả`
                      : `${idx * 20 + 1} - ${Math.min((idx + 1) * 20, server.server_data.length)}`}
                  </button>
                ))}
              </div>
              {/* Danh sách tập trong nhóm */}
              <div className="flex gap-2 flex-wrap">
                {groups[groupIndex]?.map(ep => (
                  <button
                    key={ep.slug}
                    onClick={() => navigate(`/watch/${movie.slug}/${ep.slug}?link=${encodeURIComponent(ep.link_embed)}`)}
                    className="bg-gray-700 hover:bg-red-600 px-3 py-1 rounded text-sm transition min-w-[70px]"
                  >
                    {ep.name}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <button className="bg-red-600 px-6 py-2 rounded font-bold hover:bg-red-700 transition mt-4">
          Xem phim
        </button>
      </div>
    </div>
  );
}

export default MovieDetail;