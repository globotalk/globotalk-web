import React, { Component } from 'react';
import './App.css';
import Home from './Home.js'
import Chatroom from './Chatroom.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
