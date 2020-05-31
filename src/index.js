import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router} from 'react-router-dom'
import Login from './login/login'
import Signup from './signup/signup'
import Dashboard from './dashboard/dashboard'

const firebase = require("firebase")
require("firebase/firestore")

// place your firebase credentials here 


const routing = (
  <Router>
    <div id = 'routing-container'>
      <Route  path = "/login" component= {Login}></Route>
      <Route  path = "/signup" component= {Signup}></Route>
      <Route  path = "/dashboard" component= {Dashboard}></Route>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
