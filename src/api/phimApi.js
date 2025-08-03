import axios from "axios";

const BASE_URL="https://phimapi.com";

export const getNewMovies = (page=1) =>{
  return axios.get(`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`);
}

export const getTrendingMovies = () => {
return axios.get(`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=1&limit=10`)
}

export const getMovieDetail = (slug) =>{
  return axios.get(`${BASE_URL}/phim/${slug}`);
}

export const searchMovies = (keyword,page =1) =>
{
  return axios.get(`${BASE_URL}/v1/api/tim-kiem?keyword=${keyword}&page=${page}`);
}

export const getGenres = () => {
  return axios.get(`${BASE_URL}/the-loai`);
}

export const getMoviesByGenre = (
  genreSlug,
  page = 1,
  sortField = "modified.time",
  sortType = "desc",
  sortLang = "",
  country = "",
  year = ""
) => {
  const params = [
    `page=${page}`,
    `sort_field=${sortField}`,
    `sort_type=${sortType}`,
    sortLang ? `sort_lang=${sortLang}` : "",
    country ? `country=${country}` : "",
    year ? `year=${year}` : ""
  ].filter(Boolean).join("&");
  return axios.get(`${BASE_URL}/v1/api/the-loai/${genreSlug}?${params}`);
}

export const getCountry = () => {
  return axios.get(`${BASE_URL}/quoc-gia`);
}

export const getMoviesByCountry = (countrySlug, page=1) => {
  return axios.get(`${BASE_URL}/v1/api/quoc-gia/${countrySlug}?page=${page}`);
}

export const getMoviesByType= (type, page=1) =>
{
  return axios.get(`${BASE_URL}/v1/api/danh-sach/${type}?page=${page}`);
}