import axios from 'axios'
import { API_ROOT } from '../utils/constants'

export const fetchMoviesAPI = async () => {
  const request = await axios.get(`${API_ROOT}/v1/movies`)
  return request.data
}

export const fetchRecentMoviesAPI = () => {
  return axios.get(`${API_ROOT}/v1/recent?limit=10`)
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
