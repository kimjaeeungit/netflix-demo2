import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopRatedMovies = () => {
  return api.get('/movie/top_rated');
};

//React Hook 만들기
//나중에 다른곳에서도 쓸수 있기떄문에 만들어놓기
export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-top_rated'],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
