import { useEffect, useState } from 'react';
import { Button } from '../components/Button';

import { api } from '../services/api';
import { GenreResponseProps } from '../shared/interfaces/interfaces'

interface SharedProps {
  onHandleClickButton(id: number): void;
  onSelectedGenreId: number;
}

export function SideBar({ onHandleClickButton, onSelectedGenreId }: SharedProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => onHandleClickButton(genre.id)}
              selected={onSelectedGenreId === genre.id}
            />
          ))}
        </div>
    </nav>
  )
  
}