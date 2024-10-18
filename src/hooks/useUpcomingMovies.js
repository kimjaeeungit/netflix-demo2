import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchUpcomingMovies = () => {
  return api.get('/movie/upcoming');
};

//React Hook 만들기
//나중에 다른곳에서도 쓸수 있기떄문에 만들어놓기
export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-upcoming'],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};
