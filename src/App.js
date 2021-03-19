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


function App() {
  return (
    <div className="container-fluid banner">
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
