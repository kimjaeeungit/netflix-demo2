import React from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useMovieVideoQuery } from '../../hooks/useMovieVideo';
import { opts } from '../../constants/opts';
import './MovieModal.style.css';
import { XLg } from 'react-bootstrap-icons';

const MovieModal = (props) => {
  const { data, isLoading, isError, error } = useMovieVideoQuery(props.id);
  console.log('adsadasdad', opts);
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
          <YouTube
            videoId={data.results[1].key}
            opts={opts}
            onReady={onReady}
          />
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default MovieModal;
