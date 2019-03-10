import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import './css/app.css';
import 'zent/css/index.css';
import 'tachyons/css/tachyons.css'

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/post' component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
