import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchPopularMovies = () => {
  return api.get('/movie/popular');
};

//React Hook 만들기
//나중에 다른곳에서도 쓸수 있기떄문에 만들어놓기
export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-popular'],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};
