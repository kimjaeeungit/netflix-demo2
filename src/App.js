import './App.css';
import AppLayout from './layout/AppLayout';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import NotFoundPage from './pages/NotFoundpage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviePage from './pages/Movies/MoviePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// 1.홈페이지 /
// 2.영화 전체 보여주는 페이지 (서치) /movies?q=asds
// 3.영화 디테일 페이지 /movies/:id
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="movies">
          <Route index element={<MoviePage />} />
          <Route path=":id" element={<MovieDetailPage />} />
        </Route>
        {/* <Route path="/movies" element={<MoviePage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} /> */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
