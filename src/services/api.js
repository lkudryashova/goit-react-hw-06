import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTUyMGNhMTU4N2VlN2YxZWVhZjk4ZGFhODJmZjFhMyIsIm5iZiI6MTc0MDc3MDExNy45OTQsInN1YiI6IjY3YzIwYjQ1YmM2OTM1YTAwMWEyNzNlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.byXNSWxavc7Z5GlWFFUEWWHjyxWocQuuqrMZKOI-lhk";

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?query=${query}`,
    options
  );
  return data.results;
};

export const fetchMovieDetails = async (moviesId) => {
  const { data } = await axios.get(`${BASE_URL}/movie/${moviesId}`, options);
  return data;
};

export const fetchMovieCast = async (moviesId) => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${moviesId}/credits?language=en-US`,
    options
  );
  return data.cast;
};

export const fetchMovieReviews = async (moviesId) => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${moviesId}/reviews?language=en-US&page=1`,
    options
  );
  return data.results;
};
