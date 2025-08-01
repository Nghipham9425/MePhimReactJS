import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay } from 'swiper/modules';

import { useNavigate } from 'react-router-dom';


function BannerSlide({ movies, overlapNav }) {
  const navigate = useNavigate();
  if (!movies || movies.length === 0) return null;

  return (
    <div className={`w-full h-[420px] md:h-[540px] relative mb-8 ${overlapNav ? 'banner-overlap' : ''}`}>
      {/* Overlay đen mờ phía trên để chữ nav luôn nổi bật */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-24 z-30 bg-gradient-to-b from-black/90 via-black/60 to-transparent"></div>
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={900}
        loop
        className="w-full h-full"
      >
        {movies.map(movie => (
          <SwiperSlide key={movie._id}>
            <div className="relative w-full h-[420px] md:h-[540px]">
              {/* Background với blur và tối */}
              <img
                src={movie.thumb_url}
                alt={movie.name}
                className="absolute inset-0 w-full h-full object-cover brightness-75 transition-all duration-700"
              />
              {/* Gradient phủ dưới để chữ nội dung nổi bật */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              {/* Nội dung */}
              <div className="absolute left-0 bottom-0 p-8 max-w-[90%] z-30">
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-2 drop-shadow">{movie.name}</h2>
                <p className="text-white text-lg mb-4 drop-shadow">{movie.origin_name}</p>
                <button className="bg-red-600 px-6 py-2 rounded font-bold hover:bg-red-700 transition" onClick={() => navigate(`/movie/${movie.slug}`)}>Xem</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerSlide;