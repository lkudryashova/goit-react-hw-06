import { NavLink, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  if (!movies) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <ul>
        {movies
          .filter((item) => item.poster_path)
          .map((item) => (
            <li key={item.id}>
              <NavLink to={`/movies/${item.id}`} state={location}>
                {item.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
}
