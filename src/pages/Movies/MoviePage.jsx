import React, { useCallback } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import GenreButton from './components/Genre/GenreButton';

// 경로 2가지
// 1. nav바에서 클릭해서 온경우 => popularMovie 보여주기
// 2. keyword를 입력해서 온경우 => keyword와 관련돈 영화들을 보여줌
const MoviePage = () => {
  // 페이지와 정렬 상태 관리
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(0); // 드롭박스
  const [genreBtnIds, setGenreBtnIds] = useState([]); //누른 버튼 장르 배열
  const [filteredMovies, setFilteredMovies] = useState([]); //필터 된 데이터

  // URL 쿼리에서 keyword 가져오기
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

  // 영화 및 장르 데이터 가져오기
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  const { data: GenreData } = useMovieGenreQuery();

  // 페이지네이션 클릭 처리
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // 정렬 변경 처리
  const changeSort = (num) => {
    setSort(num);
    applyFilterAndSort(num); // 상태를 업데이트한 후 직접 호출
  };
  // 장르 버튼 클릭 처리
  const filterMovie = (id) => {
    setGenreBtnIds((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id]
    );
  };
  // useCallback으로 applyFilterAndSort 메모이제이션
  const applyFilterAndSort = useCallback(
    (currentSort) => {
      if (!data || !data.results) return;

      // 장르 필터링
      const filtered =
        genreBtnIds.length === 0
          ? data.results
          : data.results.filter((movie) =>
              movie.genre_ids.some((genreId) => genreBtnIds.includes(genreId))
            );

      // 정렬
      const sorted = filtered.sort((a, b) => {
        return currentSort === 0
          ? b.popularity - a.popularity // Most Popular
          : a.popularity - b.popularity; // Least Popular
      });

      setFilteredMovies(sorted);
    },
    [data, genreBtnIds]
  );

  // genreBtnIds, data 상태가 변경될 때마다 필터링 및 정렬 수행
  useEffect(() => {
    applyFilterAndSort(sort); // sort 상태를 인자로 넘김
  }, [genreBtnIds, data]);

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: '5rem', height: '5rem' }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container className="main-container">
      <Row>
        {/* 왼쪽 장르 필터 및 정렬 */}
        <Col lg={4} xs={12} className="filter-sort-box mt-4 mb-5">
          <Dropdown>
            <Dropdown.Toggle className="dropdown-box" variant="dark">
              <div>
                Sort Results By Popularity
                {sort === 0
                  ? ' (Most Popular)'
                  : sort === 1
                  ? ' (Least Popular)'
                  : ''}
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu" variant="dark">
              <Dropdown.Item onClick={() => changeSort(0)}>
                Popularity (Most Popular)
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeSort(1)}>
                Popularity (Least Popular)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="genre-box">
            <div className="genre-title">Genre</div>
            {GenreData?.map((genre) => (
              <GenreButton
                className="genre-btn"
                name={genre.name}
                key={genre.id}
                id={genre.id}
                onClick={() => filterMovie(genre.id)} // 장르 필터링 함수 호출
                isActive={genreBtnIds.includes(genre.id)} // 버튼 활성화 상태 표시
              />
            ))}
          </div>
        </Col>
        <Col lg={8} xs={12} className="filter-sort-box">
          {/* 오른쪽 영화 목록 */}
          <Row className="movie-list-row mt-4 mb-5">
            {filteredMovies.map((movie, index) => (
              <Col key={index} lg={3} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          {/* 페이지네이션 */}
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={500} //전체 페이지
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
