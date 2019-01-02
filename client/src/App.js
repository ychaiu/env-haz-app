import React, { Component } from 'react';
import Map from './components/map/map.jsx';
import NavBar from './components/navbar/navbar.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMarker: {
                lat: '',
                lng: ''
            }
        }
    this.handleNewMarkerCoords = this.handleNewMarkerCoords.bind(this);
    }

    handleNewMarkerCoords = (data) => {
        console.log(data);
        // this.setState (prevState => ({newMarker:
        //     {...prevState.newMarker, lat: newlat, lng: newlng
        //     }
        // }), () => console.log(this.state.newMarker))
    }

  render() {
    return (
      <div className="app">
          <NavBar />
          <Map 
            handleNewMarkerCoords = {this.handleNewMarkerCoords} 
          />
      </div>
    );
  }
}

export default App;
