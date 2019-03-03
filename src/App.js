import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {get} from './utils/request';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {posts:[]};
  }
  componentDidMount() {
    get('/post').then(res => this.setState({posts: res.result || []}))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React with kaizige
          </a>
          <ul>{this.state.posts.map(item => <li>{item.title}</li>)}</ul>
        </header>
      </div>
    );
  }
}

export default App;
