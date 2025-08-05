import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMovieDetail } from '../api/phimApi';

function Watch() {
  const { slug, tap } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const link = query.get('link');
  const navigate = useNavigate();

  const [episodes, setEpisodes] = useState([]);
  const [currentEpIdx, setCurrentEpIdx] = useState(-1);

  useEffect(() => {
    getMovieDetail(slug).then(res => {
      const allEps = res.data.episodes?.flatMap(server => server.server_data) || [];
      setEpisodes(allEps);
      setCurrentEpIdx(allEps.findIndex(e => e.slug === tap));
    });
  }, [slug, tap]);

  const prevEp = episodes[currentEpIdx - 1];
  const nextEp = episodes[currentEpIdx + 1];

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded overflow-hidden shadow-lg">
        <iframe
          src={link}
          title="Player"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      <div className="text-white mt-4 text-lg font-bold">
        Đang xem: {slug} {tap && `(Tập ${tap})`}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          disabled={!prevEp}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-red-600 disabled:opacity-50"
          onClick={() => prevEp && navigate(`/watch/${slug}/${prevEp.slug}?link=${encodeURIComponent(prevEp.link_embed)}`)}
        >
          ← Tập trước
        </button>
        <button
          disabled={!nextEp}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-red-600 disabled:opacity-50"
          onClick={() => nextEp && navigate(`/watch/${slug}/${nextEp.slug}?link=${encodeURIComponent(nextEp.link_embed)}`)}
        >
          Tập tiếp →
        </button>
      </div>
    </div>
  );
}

export default Watch;