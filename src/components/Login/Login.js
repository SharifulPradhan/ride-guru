import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


const Login = () => {

  // firebase Auth Providers
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const [newUser, setNewUser] = useState(false);
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
  console.log(loggedInUser);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  // Google Sign In Firebase Authentication
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
        history.replace(from)
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.code);
      })
  }

  // Facebook Signin Firebase Authentication
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
        history.replace(from)
      })
      .catch(err => {
        console.log(err.message);
        console.log(err.code);
      });
  }

  // Email Passsword Signin Firbase Authentication
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
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then( res => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
      updateUserName(user.name);
    })
    .catch(error => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    })
  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then( res => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.name = res.user?.displayName;
      newUserInfo.success = true;
      newUserInfo.isSignIn = true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      history.replace(from);
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

  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(() => {
      console.log('user name updated Successfully')
    }).catch((error) => {
      console.log(error)
    });
    console.log(name);
  }
  return (
    <div className="container border text-center d-flex flex-column justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="form-group d-flex flex-column">
        <h1 className="mt-5"> { newUser ? 'Create an account' : 'Login'}</h1>
        <p style={{color:"red", fontWeight:'700'}}>{user.error}</p>
        {
        user.success && <p style={{color:"green", fontWeight:'700'}}>{newUser ? "Account successfully created" : "Login Successfull"}</p>
        }
        {
          newUser && <input type="text" className="form-control mt-5" name="name" onBlur={handleBlur}  placeholder="Name" required/>
        }
        <input type="email" className="form-control mt-5" name="email" onBlur={handleBlur} placeholder="Email" required/>
        <input type="password" className="form-control mt-5" name="password" onBlur={handleBlur} placeholder="Password" required/>
        {
          newUser 
          ? <input type="submit" className="btn btn-primary mt-5" value="Create an account" />
          : <input type="submit" className="btn btn-primary mt-5" value="Login" />
        }
        {
          newUser
          ?<p>Already have an account? <Link to="/login" onClick={() => setNewUser(!newUser)}>Login</Link></p>
          :<p>Don't have an account? <Link to="/login" onClick={() => setNewUser(!newUser)}>Create an account</Link></p>
        }
        <p>or</p>
      </form>
      <Button onClick={handleFBSignin} className="mb-2 w-25" ><FontAwesomeIcon icon={faFacebook} /> Sing in with Facebook</Button>
      <Button onClick={handleGoogleSignin} className="mb-4 w-25"><FontAwesomeIcon icon={faGoogle} /> Sing in with Google</Button>
    </div>
  );
};

export default Login;