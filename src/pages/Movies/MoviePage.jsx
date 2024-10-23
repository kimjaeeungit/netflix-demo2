import React from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css';

// 1. 페이지네이션 설치
// 2. page state 만들기
// 3. 페이지네이션 클릭할때마다 page바꿔주기
// 4. page 값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch

// 경로 2가지
// 1. nav바에서 클릭해서 온경우 => popularMovie 보여주기
// 2. keyword를 입력해서 온경우 => keyword와 관련돈 영화들을 보여줌
const MoviePage = () => {
  // 페이지 네이션
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(0);
  // url 쿼리값 읽어오는거 하기
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  const changeSort = (num) => {
    setSort(num);
  };

  // 전체 페이지 기준으로 정렬
  const sortedMovies = () => {
    if (!data || !data.results) return [];
    const sorted = [...data.results].sort((a, b) => {
      return sort === 0
        ? b.popularity - a.popularity // Most Popular (내림차순)
        : a.popularity - b.popularity; // Least Popular (오름차순)
    });
    return sorted;
  };

  console.log('setSort', sort);
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
        <Col lg={4} xs={12} className="mt-4 mb-5">
          <Dropdown>
            <Dropdown.Toggle className="dropdown-box" variant="dark">
              Sort Results By Popularity
              {sort === 0
                ? ' (Most Popular)'
                : sort === 1
                ? ' (Least Popular)'
                : ''}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu" variant="dark">
              <Dropdown.Item onClick={(num) => changeSort(0)}>
                Popularity (Most Popular)
              </Dropdown.Item>
              <Dropdown.Item onClick={(num) => changeSort(1)}>
                Popularity (Least Popular)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col lg={8} xs={12}>
          <Row className="mt-4 mb-5">
            {sortedMovies().map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} //전체 페이지
            previousLabel="< previous"
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
