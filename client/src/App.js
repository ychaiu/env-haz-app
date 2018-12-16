import React, { Component } from 'react';
import Map from './components/map/map.jsx';
import NavBar from './components/navbar/navbar.jsx';
import EventFormContainer from './containers/eventFormContainer.jsx';
import About from './components/about/about.jsx';


class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar />
          <Map />
          <About />
      </div>
    );
  }
}

export default App;
