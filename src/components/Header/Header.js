import { Button } from 'react-bootstrap';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <>
      <Navbar className="container justify-content-end">
        <Navbar.Brand href="#home">Ride Guru</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#features">Destination</Nav.Link>
          <Nav.Link href="#pricing">Blog</Nav.Link>
          <Nav.Link href="#pricing">Contact</Nav.Link>
          <Button>Login</Button>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;