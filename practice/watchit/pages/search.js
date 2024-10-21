import { useRouter } from 'next/router';
import MovieList from '@/components/MovieList';
import SearchForm from '@/components/SearchForm';
import styles from '@/styles/Search.module.css';
import Container from '@/components/Container';
import instance from '@/lib/axios';
import { useState, useEffect } from 'react';
import Head from 'next/head.js';

export default function Search() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const q = router.query['q'];

  async function getMovies(keyword) {
    const response = await instance.get(`/movies/?q=${keyword}`);
    const nextMovies = response.data.results ?? [];
    setMovies(nextMovies);
  }
  useEffect(() => {
    getMovies(q);
  }, [q]);

  return (
    <>
      <Head>
        <title>{q} 검색 결과 - watchit</title>
      </Head>
      <Container page>
        <SearchForm initialValue={q} />
        <h2 className={styles.title}>
          <span className={styles.keyword}>{q}</span> 검색 결과
        </h2>
        <MovieList movies={movies} />
      </Container>
    </>
  );
}
