import React, { Component } from 'react';
import './App.css';
import Map from './components/map/map';
import NavBar from './components/navbar/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
          my main app component
          <NavBar />
          <Map />
      </div>
    );
  }
}

export default App;
