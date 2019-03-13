import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import asyncComponent from './utils/asyncComponent';
// import Home from './components/Home';
// import Login from './components/Login';
import './css/app.css';
import 'zent/css/index.css';
import 'tachyons/css/tachyons.css'

const AsyncHome = asyncComponent(() => import('./components/Home'));
const AsyncLogin = asyncComponent(() => import('./components/Login'));
class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={AsyncHome}></Route>
          <Route path='/login' component={AsyncLogin}></Route>
          <Route path='/post' component={AsyncHome}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
