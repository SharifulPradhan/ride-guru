import { Button } from 'react-bootstrap';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App'
import firebase from "firebase/app";
import { Link } from 'react-router-dom';

const UserDetails = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setLoggedInUser(signedOutUser);
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.code);
      })
  }
  return (
    <div className="container text-center">
      <img src={loggedInUser.photo} alt=""/>
      <h1>{loggedInUser.name}</h1>
      <h1>{loggedInUser.email}</h1>
      <Button onClick={handleSignOut}><Link to="/home" className="text-white">Sign Out</Link></Button>
    </div>
  );
};

export default UserDetails;