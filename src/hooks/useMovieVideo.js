import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieVideo = (id) => {
  return api.get(`/movie/${id}/videos`);
};

export const useMovieVideoQuery = (id) => {
  return useQuery({
    queryKey: ['movieVideo', id],
    queryFn: () => fetchMovieVideo(id),
    select: (result) => result.data,
  });
};
