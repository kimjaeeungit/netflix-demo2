import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './NotFoundPage.style.css';

const NotFoundPage = () => {
  return (
    <Container>
      <Row className="main">
        <Col className="box">
          <p className="NotFound">404</p>
        </Col>
        <Col>
          <p className="Opps">Oops,</p>
          <div className="NothingHere">
            <p className="Nothing">nothing </p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <p className="Opps"> here...</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
