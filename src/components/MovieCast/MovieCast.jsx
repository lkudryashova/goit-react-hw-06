import s from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import { useEffect, useState } from "react";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const casts = await fetchMovieCast(movieId);
      setCasts(casts);
    };
    getData();
  }, [movieId]);
  return (
    <div>
      {casts.length > 0 ? (
        <ul className={s.list}>
          {casts.map((item) => (
            <li key={item.id} className={s.item}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>Character: {item.character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No information</p>
      )}
    </div>
  );
}
