import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetail } from '../api/phimApi';
import he from 'he';
import Loading from '../components/Loading';

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
  const [selectedServer, setSelectedServer] = useState(0);
  const [groupIndex, setGroupIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovieDetail(id).then(res => {
      setMovie(res.data.movie);
      setEpisodes(res.data.episodes || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (!movie) return <div className="text-white p-8 text-center">Không tìm thấy phim</div>;

  const currentServer = episodes[selectedServer];
  const groups = currentServer ? chunkArray(currentServer.server_data, 20) : [];

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Hero Section - sử dụng poster thay vì thumb */}
      <header
        className="relative pt-20 pb-8 px-4 md:px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(https://phimapi.com/image.php?url=${encodeURIComponent(movie.thumb_url)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <section className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster */}
            <aside className="flex-shrink-0">
              <img
                src={`https://phimapi.com/image.php?url=${encodeURIComponent(movie.poster_url)}`}
                alt={he.decode(movie.name)}
                className="w-64 h-96 object-cover rounded-lg shadow-2xl mx-auto lg:mx-0"
                onError={e => { e.target.src = '/no-image.png'; }}
              />
            </aside>

            {/* Movie Information */}
            <article className="flex-1">
              <header>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{he.decode(movie.name)}</h1>
                {movie.origin_name && (
                  <h2 className="text-xl text-gray-300 mb-4">{he.decode(movie.origin_name)}</h2>
                )}
              </header>

              {/* Movie Stats */}
              <section className="flex items-center gap-4 mb-4">
                {movie.tmdb?.vote_average && (
                  <span className="flex items-center bg-yellow-600 px-3 py-1 rounded-full">
                    ⭐ <strong className="ml-1">{movie.tmdb.vote_average.toFixed(1)}</strong>
                  </span>
                )}
                <span className="bg-red-600 px-3 py-1 rounded-full font-bold">{movie.quality}</span>
                <span className="bg-green-600 px-3 py-1 rounded-full font-bold">{movie.lang}</span>
              </section>

              {/* Movie Details Grid */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <dl className="space-y-2">
                  <div><dt className="text-gray-400 inline">Năm:</dt> <dd className="text-white font-semibold inline ml-2">{movie.year}</dd></div>
                  <div><dt className="text-gray-400 inline">Thời lượng:</dt> <dd className="text-white inline ml-2">{movie.time}</dd></div>
                  <div>
                    <dt className="text-gray-400 inline">Trạng thái:</dt>
                    <dd className={`ml-2 px-2 py-1 rounded text-sm inline-block ${movie.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}`}>
                      {movie.status === 'completed' ? 'Hoàn tất' : 'Đang phát sóng'}
                    </dd>
                  </div>
                  <div><dt className="text-gray-400 inline">Số tập:</dt> <dd className="text-white inline ml-2">{movie.episode_current}</dd></div>
                </dl>
                <dl className="space-y-2">
                  <div><dt className="text-gray-400 inline">Thể loại:</dt> <dd className="text-white inline ml-2">{movie.category?.map(c => c.name).join(', ')}</dd></div>
                  <div><dt className="text-gray-400 inline">Quốc gia:</dt> <dd className="text-white inline ml-2">{movie.country?.map(c => c.name).join(', ')}</dd></div>
                  <div><dt className="text-gray-400 inline">Diễn viên:</dt> <dd className="text-white inline ml-2">{movie.actor?.slice(0, 3).join(', ')}</dd></div>
                  <div><dt className="text-gray-400 inline">Đạo diễn:</dt> <dd className="text-white inline ml-2">{movie.director?.join(', ')}</dd></div>
                </dl>
              </section>

              {/* Action Buttons */}
              <nav className="flex flex-wrap gap-3 mb-6">
                <button
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition flex items-center gap-2"
                  onClick={() => {
                    const firstEp = episodes[0]?.server_data[0];
                    if (firstEp) {
                      navigate(`/watch/${movie.slug}/${firstEp.slug}?link=${encodeURIComponent(firstEp.link_embed)}`);
                    }
                  }}
                >
                  Xem phim
                </button>
                {movie.trailer_url && (
                  <button
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-bold transition flex items-center gap-2"
                    onClick={() => window.open(movie.trailer_url, '_blank')}
                  >
                    🎬 Trailer
                  </button>
                )}
              </nav>
            </article>
          </section>
        </div>
      </header>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        {/* Movie Synopsis */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Nội dung phim</h3>
          <p className="text-gray-300 leading-relaxed text-lg">{he.decode(movie.content)}</p>
        </section>

        {/* Episodes Section */}
        {episodes.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Danh sách tập phim</h3>

            {/* Server Tabs */}
            {episodes.length > 1 && (
              <nav className="flex gap-2 mb-4 flex-wrap" role="tablist">
                {episodes.map((server, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={selectedServer === idx}
                    onClick={() => {
                      setSelectedServer(idx);
                      setGroupIndex(0);
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${selectedServer === idx
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                  >
                    {server.server_name}
                  </button>
                ))}
              </nav>
            )}

            {/* Episode Groups */}
            {groups.length > 1 && (
              <nav className="flex gap-2 mb-4 flex-wrap">
                {groups.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGroupIndex(idx)}
                    className={`px-3 py-2 rounded text-sm font-bold transition ${groupIndex === idx
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-200 hover:bg-red-700'
                      }`}
                  >
                    {`${idx * 20 + 1} - ${Math.min((idx + 1) * 20, currentServer.server_data.length)}`}
                  </button>
                ))}
              </nav>
            )}

            {/* Episodes Grid */}
            <nav className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
              {groups[groupIndex]?.map(ep => (
                <button
                  key={ep.slug}
                  onClick={() => navigate(`/watch/${movie.slug}/${ep.slug}?link=${encodeURIComponent(ep.link_embed)}`)}
                  className="bg-gray-700 hover:bg-red-600 px-3 py-2 rounded text-sm transition aspect-square flex items-center justify-center font-semibold"
                >
                  {ep.name.replace('Tập ', '')}
                </button>
              ))}
            </nav>
          </section>
        )}
      </div>
    </main>
  );
}

export default MovieDetail;