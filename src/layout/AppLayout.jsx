import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const searchByKeyword = (event) => {
    event.preventDefault();
    //url 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword('');
  };
  return (
    <div className="body">
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid className="layoutContainer">
          <Link to={'/'}>
            <Navbar.Brand>
              <img
                className="logo"
                src="https://mostaql.hsoubcdn.com/uploads/portfolios/2078649/63e3e7557bb05/Netflix-Logo.png"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link
                to="/"
                className="text-white me-4 link-offset-2 link-underline link-underline-opacity-0"
              >
                Home
              </Link>
              <Link
                to="/movies"
                className="text-white link-offset link-underline link-underline-opacity-0"
              >
                Movies
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* //라우터 안에있는 자손들을 갖고오는 컴포넌트 */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
