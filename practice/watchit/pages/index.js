import MovieList from '@/components/MovieList';
import SearchForm from '@/components/SearchForm';
import styles from '@/styles/Home.module.css';
import instance from '@/lib/axios';

export async function getStaticProps() {
  const response = await instance.get(`/movies`);
  const movies = response.data.results ?? [];

  return {
    props: {
      movies,
    },
  };
}

export default function Home({ movies }) {
  return (
    <>
      <SearchForm />
      <MovieList className={styles.movieList} movies={movies} />
    </>
  );
}
