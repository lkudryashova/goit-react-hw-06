import s from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const reviews = await fetchMovieReviews(movieId);
      setReviews(reviews);
    };
    getData();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map((item) => (
            <li key={item.id}>
              <h4 className={s.author}>Author: {item.author}</h4>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
}
