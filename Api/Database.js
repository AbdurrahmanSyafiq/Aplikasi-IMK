import axios from "axios";
import { apiKey } from "../apikey";
const ApiBaseUrl = "https://api.themoviedb.org/3";
const TrendingMoviesEndPoint = `${ApiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const UpcomingMoviesEndPoint = `${ApiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const TopRatedMoviesEndPoint = `${ApiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${ApiBaseUrl}/search/movie?api_key=${apiKey}`;
const DetailsMoviesEndPoint = (id) =>
  `${ApiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const MovieCreditsEndPoint = (id) =>
  `${ApiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${ApiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const personDetailsEndpoint = (id) =>
  `${ApiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id) =>
  `${ApiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";
const apiSync = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};
export const fetchTrendingMovies = () => {
  return apiSync(TrendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiSync(UpcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiSync(TopRatedMoviesEndPoint);
};
export const fetchMovieDetails = (id) => {
  return apiSync(DetailsMoviesEndPoint(id));
};
export const fetchMovieCredits = (movieId) => {
  return apiSync(MovieCreditsEndPoint(movieId));
};
export const fetchSimilarMovies = (movieId) => {
  return apiSync(similarMoviesEndpoint(movieId));
};
export const fetchPersonDetails = (personId) => {
  return apiSync(personDetailsEndpoint(personId));
};
export const fetchPersonMovies = (personId) => {
  return apiSync(personMoviesEndpoint(personId));
};
export const searchMovies = (params) => {
  return apiSync(searchMoviesEndpoint, params);
};
