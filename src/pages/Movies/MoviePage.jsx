import React from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Alert } from 'bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

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
  // url 쿼리값 읽어오는거 하기
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  const handlePageClick = ({ selected }) => {
    console.log('page', page);
    setPage(selected + 1);
  };
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

  console.log('datadata', data);
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          필터
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
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
