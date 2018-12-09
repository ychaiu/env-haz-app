import React, { Component } from 'react';
import './App.css';
import Map from './components/map';


class App extends Component {
  render() {
    return (
      <div className="App">
          my main app component
          <Map />
      </div>
    );
  }
}

export default App;
