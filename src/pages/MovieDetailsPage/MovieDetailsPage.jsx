import {
  useLocation,
  useParams,
  Outlet,
  Link,
  NavLink,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchMovieDetails } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackUrl = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getData = async () => {
      const movie = await fetchMovieDetails(movieId);
      setMovie(movie);
    };
    getData();
  }, [movieId]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={s.container}>
      <Link to={goBackUrl.current}>Go back</Link>
      <div className={s.wrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className={s.description}>
          <h2>{`${movie.title} (${new Date(movie.release_date).getFullYear()})`}</h2>
          <p>User Score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <nav className={s.addInfo}>
        <p>Additional Information</p>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
