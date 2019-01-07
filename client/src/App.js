import React, { Component } from 'react';
import Map from './components/map/map.jsx';
import NavBar from './components/navbar/navbar.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          newMarker: {
              lat: '',
              lng: ''
          }
      }
      this.handleCoordinates = this.handleCoordinates.bind(this)
    }

   handleCoordinates(newMarker) {
    this.setState(newMarker)
   }

  render() {
    return (
      <Router>
        <div className="app">
            <NavBar 
              newMarker = {this.state.newMarker}
            />
            <Map
              handleCoordinates={this.handleCoordinates}
            />
        </div>
      </Router>
    );
  }
}

export default App;
