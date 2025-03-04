import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };
    getData();
  }, []);
  return (
    <div className={s.container}>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
