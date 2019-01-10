import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar />
        Hello from app.js
      </div>
    );
  }
}

export default App;
