import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { React, useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
  const [loggedInUser] = useContext(UserContext);
  return (
    <>
      <nav className="mt-5 navbar navbar-light navbar-expand">
        <div className="container justify-content-end">
          <div className="navbar-nav">
            <Link className="nav-link pr-5 active" to="/home">Home</Link>
            <Link className="nav-link pr-5" to="/destination">Destination</Link>
            <Link className="nav-link pr-5" to="/blog">Blog</Link>
            <Link className="nav-link pr-5" to="/contact">Contact</Link>
            <Button>
              {loggedInUser.isSignIn
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