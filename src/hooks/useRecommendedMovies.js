import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchRecommendedMovies = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useRecommendedMovieQuery = (id) => {
  return useQuery({
    queryKey: ['movie-recommended', id],
    queryFn: () => fetchRecommendedMovies(id),
    select: (result) => result.data,
  });
};
