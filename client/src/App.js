import React, { Component } from 'react';
import './App.css';
import Map from './components/map/map';
import NavBar from './components/navbar/navbar';
import EventFormContainer from './containers/eventFormContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar />
          <Map />
          <EventFormContainer />
      </div>
    );
  }
}

export default App;
