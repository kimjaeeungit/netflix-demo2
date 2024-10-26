import React from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useMovieVideoQuery } from '../../hooks/useMovieVideo';
import { opts } from '../../constants/opts';
import './MovieModal.style.css';
import { XLg } from 'react-bootstrap-icons';

const MovieModal = (props) => {
  const { data, isLoading, isError, error } = useMovieVideoQuery(props.id);

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

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    event.target.unMute(); // Unmute the video
  };

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 비디오 키
  const videoKey = data?.results?.[0]?.key; // 0번째 인덱스 사용

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        //closeButton
        style={{ backgroundColor: 'black', color: 'white' }}
        //closeVariant="white" // 기본 X 버튼을 흰색으로 변경
      >
        <XLg
          type="button"
          aria-label="Close"
          onClick={props.onHide}
          size={24}
          className="x-icon"
        />
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: 'black', color: 'white' }}>
        <div className="video-responsive">
          {videoKey ? (
            <YouTube
              videoId={videoKey} // 동영상 키 사용
              opts={opts}
              onReady={onReady}
            />
          ) : (
            <div>
              <Alert variant="danger" style={{ marginBottom: '20px' }}>
                No video available.
              </Alert>
            </div> // 비디오가 없는 경우
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MovieModal;
