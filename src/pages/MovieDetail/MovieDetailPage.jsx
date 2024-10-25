import React, { useState } from 'react';
import { Alert, Badge, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import './MovieDetailPage.style.css';
import { UsbMicroFill, PeopleFill } from 'react-bootstrap-icons';
import Review from './components/Review/Review';
import { useMovieReviewQuery } from '../..//hooks/useMovieReview';
import { useRecommendedMovieQuery } from '../../hooks/useRecommendedMovies';
import MovieCard from '../../common/MovieCard/MovieCard';
import MovieModal from '../../common/MovieModal/MovieModal';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: reviewData } = useMovieReviewQuery(id);
  const [activeBtn, setActiveBtn] = useState(1);
  const { data: recommendedMovieData } = useRecommendedMovieQuery(id);
  const [modalShow, setModalShow] = useState(false);

  const changePage = (num) => {
    setActiveBtn(num);
    if (activeBtn === 2) {
      setModalShow(true);
    }
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
  console.log('reviewDatareviewDatareviewData', reviewData);
  return (
    <Container>
      <Row>
        <Col lg={5}>
          <div
            className="poster-img"
            style={{
              backgroundImage:
                'url(' +
                `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}` +
                ')',
            }}
          ></div>
        </Col>
        <Col lg={7}>
          <div className="movie-detail-page">
            <div>
              {data?.genres.map((genre) => (
                <Badge className="genre-badge" pill bg="danger">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <div className="detail-title">{data?.title}</div>
            <div className="detail-popularity">
              <div>
                <UsbMicroFill
                  size={35}
                  color="yellow"
                  className="my-icon"
                  style={{ margin: '20px', marginLeft: '0' }}
                />
                {data?.vote_average}
              </div>
              <div>
                <PeopleFill
                  size={30}
                  color="yellow"
                  className="my-icon"
                  style={{ margin: '20px' }}
                />
                {data?.popularity}
              </div>
              <div>
                {data?.adult ? (
                  <div className="num-icon">
                    <span>18</span>
                  </div>
                ) : (
                  <div className="all-icon">
                    <span>ALL</span>
                  </div>
                )}
              </div>
            </div>
            <div className="detail-overview">{data?.overview}</div>
            <div className="badge-div">
              <div className="badge-detail-div">
                <Badge className="badge-detail" pill bg="danger">
                  Budget
                </Badge>
                <span> $ {data?.budget}</span>
              </div>
              <div className="badge-detail-div">
                <Badge className="badge-detail" pill bg="danger">
                  Revenue
                </Badge>
                <span> $ {data?.revenue}</span>
              </div>
              <div className="badge-detail-div">
                <Badge className="badge-detail" pill bg="danger">
                  Release date
                </Badge>
                <span> {data?.release_date}</span>
              </div>
              <div className="badge-detail-div">
                <Badge className="badge-detail" pill bg="danger">
                  Runtime
                </Badge>
                <span> {data?.runtime}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <div>
          <button
            className="change-btn"
            onClick={() => changePage(1)}
            style={{
              backgroundColor: activeBtn === 1 ? 'red' : 'gray',
            }}
          >
            REVIEWS
          </button>
          <button
            className="change-btn"
            onClick={() => changePage(0)}
            style={{
              backgroundColor: activeBtn === 0 ? 'red' : 'gray',
            }}
          >
            RELATED MOVIES
          </button>
          <button
            className="change-btn"
            onClick={() => setModalShow(true)}
            style={{
              backgroundColor: 'gray',
            }}
          >
            예고편 보기
          </button>
        </div>
      </Row>
      {activeBtn ? (
        <Row>
          <div
            style={{
              fontSize: '1.6rem',
              fontWeight: 'bolder',
              marginBottom: '10px',
            }}
          >
            Reviews
          </div>
          {reviewData && reviewData.results && reviewData.results.length > 0 ? (
            reviewData.results.map((review) => (
              <Review review={review} key={review.id} />
            ))
          ) : (
            <div>No reviews available</div> // 데이터가 없을 경우 처리
          )}
        </Row>
      ) : (
        <Row>
          {recommendedMovieData &&
          recommendedMovieData.results &&
          recommendedMovieData.results.length > 0 ? (
            recommendedMovieData.results.map((movie) => (
              <Col key={movie.id} lg={3} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))
          ) : (
            <div>No recommended movies available</div> // 데이터가 없을 경우 처리
          )}
        </Row>
      )}

      <MovieModal id={id} show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
};

export default MovieDetailPage;
