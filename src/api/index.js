import axios from 'axios'
import { API_ROOT } from '../utils/constants'

export const fetchMoviesAPI = () => {
  return axios.get(`${API_ROOT}/v1/movies`)
}

export const fetchRecentMoviesAPI = (limit = 10) => {
  return axios.get(`${API_ROOT}/v1/movies/recent?limit=${limit}`)
}

export const fetchCategoriesAPI = () => {
  return axios.get(`${API_ROOT}/v1/movies/categories`)
}

export const fetchCountriesAPI = () => {
  return axios.get(`${API_ROOT}/v1/movies/countries`)
}

export const fetchMovieBySlugAPI = (slug) => {
  return axios.get(`${API_ROOT}/v1/movies/${slug}`)
}

export const searchMovie = (name) => {
  return axios.get(`${API_ROOT}/v1/movies?q=${name}`)
}

export const fetchRelatedMoviesAPI = (slug) => {
  return axios.get(`${API_ROOT}/v1/movies/${slug}/related`)
}

export const fetchMoviesByCategory = (categorySlug, page=1 ,limit = 10) =>{
return axios.get(`${API_ROOT}/v1/movies/category/${categorySlug}`,{params: { page, limit }})
}
// Lấy phim theo quốc gia (country)  
export const fetchMoviesByCountry = (countrySlug, page = 1, limit = 10) => {
  return axios.get(`${API_ROOT}/v1/movies/country/${countrySlug}`, { params: { page, limit } })
}