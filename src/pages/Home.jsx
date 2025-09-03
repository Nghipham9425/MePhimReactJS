import React, { useEffect, useState } from 'react'
import Loading from '../components/common/Loading'
import BannerSlide from '../components/BannerSlide'
import MovieSection from '../components/MovieSection'
import { fetchRecentMoviesAPI, fetchMoviesByCategory, fetchMoviesByCountry } from '../api'

function Home() {
  const [movies, setMovies] = useState([])
  const [actionMovies, setActionMovies] = useState([])
  const [koreanMovies, setKoreanMovies] = useState([])
  const [dramaMovies, setDramaMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    Promise.all([
      fetchRecentMoviesAPI(15),
      fetchMoviesByCategory('hanh-dong', 1, 10),
      fetchMoviesByCountry('han-quoc', 1, 10),
      fetchMoviesByCategory('chinh-kich', 1, 10)
    ])
      .then(([recentRes, actionRes, koreanRes, dramaRes]) => {
        setMovies(recentRes.data?.data || [])
        setActionMovies(actionRes.data?.data || [])
        setKoreanMovies(koreanRes.data?.data || [])
        setDramaMovies(dramaRes.data?.data || [])
      })
      .catch(err => {
        console.error('Lỗi tải dữ liệu trang chủ:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading />

  const featuredMovies = movies.slice(0, 8)

  return (
    <div className='bg-black min-h-screen pb-5'>
      <BannerSlide movies={featuredMovies} overlapNav />
      <div className="px-0">
        <MovieSection
          title="Phim mới cập nhật"
          movies={movies.slice(0, 10)}
          slider
        />
        <MovieSection
          title="Phim Hành Động"
          movies={actionMovies.slice(0, 10)}
          slider
        />
        <MovieSection
          title="Phim Hàn Quốc"
          movies={koreanMovies.slice(0, 10)}
          slider
        />
        <MovieSection
          title="Phim Chính Kịch"
          movies={dramaMovies.slice(0, 10)}
          slider
        />
      </div>
    </div>
  )
}

export default Home