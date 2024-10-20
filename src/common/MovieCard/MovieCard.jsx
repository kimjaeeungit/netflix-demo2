import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useNavigate } from 'react-router-dom';
const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  console.log('movieCard', movie);

  const moveToDetail = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };
  return (
    <div
      onClick={() => moveToDetail(movie.id)}
      style={{
        backgroundImage:
          'url(' +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
          ')',
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1 className="title">{movie.title}</h1>
        {showGenre(movie.genre_ids).map((id) => (
          <Badge pill bg="danger">
            {id}
          </Badge>
        ))}
        <div className="movie-detail">
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div className="adult">{movie.adult ? 'over18' : 'under18'}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
