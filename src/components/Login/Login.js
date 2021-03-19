import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons' 
import { Button } from 'react-bootstrap';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app();
}


const Login = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

// declare a State for store user data
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })

// config a Sing in Method
  const handleGoogleSignin = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch(err => {
      console.log(err.message);
      console.log(err.code);
    })
    }


// config a Sing Out Method
    const handleSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
      const signedOutUser = {
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signedOutUser);
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.code);
      })
    }

  return (
    <div className="container bg-white text-center">
      <form action="" className="form-group d-flex flex-column">
        <h1>Create an account</h1>
        <input type="text" className="form-control" name="name" placeholder="Name"/>
        <input type="email" className="form-control" name="email" placeholder="Username or Email"/>
        <input type="password" className="form-control" name="password" placeholder="Password"/>
        <input type="password" className="form-control" name="password" placeholder="Confirm Password"/>
        <input type="submit" class="btn btn-primary" value="Create an account"/>
        <p>Already have an account? <a href="login">Login</a></p>
      </form>
      <h1>or{user.name}</h1>
      <Button size="lg"><FontAwesomeIcon icon={faFacebook} /> Sing in with Facebook</Button>
      <br/>
      <br/>
      <Button size="lg" onClick={handleGoogleSignin}><FontAwesomeIcon icon={faGoogle} /> Sing in with Google</Button>
      <Button size="lg" onClick={handleSignOut}><FontAwesomeIcon icon={faGoogle} /> Sing Out with Google</Button>
    </div>
  );
};

export default Login;