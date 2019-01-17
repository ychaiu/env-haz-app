import React, { Component } from 'react';
import Map from './components/map/map.jsx';
import NavBar from './components/navbar/navbar.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faSpinner)

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          newMarker: {
              lat: '',
              lng: '',
          },
      }
      this.handleCoordinates = this.handleCoordinates.bind(this);
    }

   handleCoordinates(newMarker) {
    this.setState(newMarker);
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

export default (App);
