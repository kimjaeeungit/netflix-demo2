import React from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);

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
    <Container>
      <Row>
        <Col lg={5}>
          <div
            style={{
              backgroundImage:
                'url(' +
                `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}` +
                ')',
            }}
          ></div>
        </Col>
        <Col lg={7}></Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;
