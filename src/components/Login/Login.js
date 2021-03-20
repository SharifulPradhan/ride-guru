import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


const Login = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();


  const [registeredUser, setRegisteredUser] = useState(false);
  // declare a State for store user data
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    photo: ''
  })
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // Google Firebase Authentication
  const handleGoogleSignin = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.code);
      })
  }

  // Facebook Firebase Authentication
  const handleFBSignin = () => {
    firebase.auth().signInWithPopup(facebookProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.code);
      });
  }
  // Email Passsword Firbase Authentication
  const handleBlur = e => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
    isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    isFieldValid = regex.test(e.target.value);
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if(!registeredUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then( res => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
    })
    .catch(error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    })
  }
  if(registeredUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then( res => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
  })
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
  });
  }

  e.preventDefault();
  }
  return (
    <div className="container border shadow rounded text-center d-flex flex-column justify-content-center align-items-center w-50">
      <form onSubmit={handleSubmit} className="form-group d-flex flex-column w-50">
        <h1> { registeredUser ? 'Login' : 'Create an account'}
        </h1>
        <p style={{color:"red", fontWeight:'700'}}>{user.error}</p>
        {
        user.success && <p style={{color:"green", fontWeight:'700'}}>{registeredUser ? "login Successfully" : "Account successfully created"}</p>
        }
        {
          !registeredUser && <input type="text" className="form-control mt-5" name="name" onBlur={handleBlur}  placeholder="Name" required/>
        }
        <input type="email" className="form-control mt-5" name="email" onBlur={handleBlur} placeholder="Email" required/>
        <input type="password" className="form-control mt-5" name="password" onBlur={handleBlur} placeholder="Password" required/>
        {
          registeredUser 
          ? <input type="submit" className="btn btn-primary mt-5" value="Login" />
          : <input type="submit" className="btn btn-primary mt-5" value="Create an account" />
        }
        {
          registeredUser
          ?<p>Don't have an account? <Link to="/login" onClick={() => setRegisteredUser(!registeredUser)}>Create an account</Link></p>
          :<p>Already have an account? <Link to="/login" onClick={() => setRegisteredUser(!registeredUser)}>Login</Link></p>
        }
      </form>
      <h1>or</h1>
      <Button size="lg" onClick={handleFBSignin}><FontAwesomeIcon icon={faFacebook} /> Sing in with Facebook</Button>
      <br />
      <br />
      <Button size="lg" onClick={handleGoogleSignin}><FontAwesomeIcon icon={faGoogle} /> Sing in with Google</Button>
    </div>
  );
};

export default Login;