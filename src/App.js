import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,
Switch,
Route,
// Link
} from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import UserDetails from './components/UserDetails/UserDetails';
import NotFound from './components/NotFound/NotFound';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]} className="container-fluid banner">
      <h1> {loggedInUser.name} </h1>
      <Router>
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/user-details'>
            <UserDetails/>
          </Route>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
