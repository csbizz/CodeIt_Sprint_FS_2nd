import MovieList from '@/components/MovieList';
import SearchForm from '@/components/SearchForm';
import styles from '@/styles/Home.module.css';
import Container from '@/components/Container';
import instance from '@/lib/axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    const response = await instance.get(`/movies`);
    const nextMovies = response.data.results ?? [];
    setMovies(nextMovies);
  }
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container page>
      <SearchForm />
      <MovieList className={styles.movieList} movies={movies} />
    </Container>
  );
}
