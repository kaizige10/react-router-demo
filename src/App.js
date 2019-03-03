import React, { Component } from 'react';
import { get } from './utils/request';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  componentDidMount() {
    get('/post').then(res => this.setState({ posts: res.result || [] }))
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/post' component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
