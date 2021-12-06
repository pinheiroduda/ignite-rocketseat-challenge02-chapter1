import { useEffect, useState } from 'react';

import { MovieCard } from '../components/MovieCard'
import { MovieProps, GenreResponseProps } from '../shared/interfaces/interfaces'

import { api } from '../services/api';

interface SelectedGenreProps {
  onSelectedGenreId: number;
}

export function Content({ onSelectedGenreId }: SelectedGenreProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${onSelectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${onSelectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [onSelectedGenreId]);
  
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
  </div>
  )
}