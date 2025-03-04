import { useState, useEffect } from "react";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getData = async () => {
      if (!query) {
        setMovies([]);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const results = await fetchMoviesByQuery(query);
        setMovies(results || []);
      } catch (err) {
        setError("Failed. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query]);

  const handleChangeQuery = (newQuery) => {
    setSearchParams(newQuery ? { query: newQuery.trim().toLowerCase() } : {});
  };

  const onSubmit = (values, { resetForm }) => {
    handleChangeQuery(values.query);
    resetForm();
  };

  const initialValues = {
    query,
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field className={s.field} type="text" name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {query && !isLoading && movies.length === 0 && (
        <p>Your request is undefined.</p>
      )}
      {query && movies.length > 0 && !isLoading && (
        <MovieList movies={movies} />
      )}
    </div>
  );
}
