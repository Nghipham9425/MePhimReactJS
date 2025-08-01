import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

function Watch() {
  const { slug, tap } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const link = query.get('link');

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
    </div>
  );
}

export default Watch;