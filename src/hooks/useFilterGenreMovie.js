import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchFilterGenreMovie = () => {
  return api.get(`/movie/popular`);
};

export const useFilterGenreMovieQuery = () => {
  return useQuery({
    queryKey: ['GenreFilterMovie'],
    queryFn: fetchFilterGenreMovie,
  });
};
