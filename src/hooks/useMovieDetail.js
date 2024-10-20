import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieDetail = (id) => {
  return api.get(`/movie/${id}`);
};

export const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ['movie-detail', id],
    queryFn: () => fetchMovieDetail(id),
    enabled: !!id, // id가 존재할 때만 쿼리 실행
    select: (result) => result.data,
  });
};
