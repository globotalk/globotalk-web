import React, { Component } from 'react';
import './App.css';
import Home from './Home.js'
import Chatroom from './Chatroom.js';
import { HashRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route path='/home' component={Home} />
          <Route path='/chat' component={Chatroom} />
        </div>
      </HashRouter>
    )
  }
}

export default App;
