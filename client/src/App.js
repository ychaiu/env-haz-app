import React, { Component } from 'react';
import './App.css';
import Map from './components/map/map';
import NavBar from './components/navbar/navbar';
import eventFormContainer from './containers/eventFormContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar />
          <Map />
          <eventFormContainer />
      </div>
    );
  }
}

export default App;
