import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser] = useContext(UserContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container justify-content-end">
            <div className="navbar-nav ">
              <Link className="nav-link" to="/home">Home</Link>
              <Link className="nav-link" to="/destination">Destination</Link>
              <Link className="nav-link" to="/blog">Blog</Link>
              <Link className="nav-link" to="/contact">Contact</Link>
              <Button>{loggedInUser.isSignIn
                ? <Link to="/user-details" className="text-white">{loggedInUser.name}</Link>
                : <Link to="/login" className="text-white">Login</Link>
              }
              </Button>
            </div>
        </div>
      </nav>


    </>
  );
};

export default Header;