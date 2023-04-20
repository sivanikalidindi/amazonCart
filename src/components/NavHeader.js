import React from 'react';
import { Link } from 'react-router-dom';
import './NavHeader.css';
import { Container, Navbar } from 'react-bootstrap';
function NavHeader() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container to="/">
          <Link to="/" style={{ textDecorationLine: 'none' }}>
            <Navbar.Brand>Amazon</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavHeader;
