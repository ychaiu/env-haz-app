import React, { Component } from 'react';
import Map from './components/map/map.jsx';
import NavBar from './components/navbar/navbar.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faSpinner, faUpload, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CommentContainer from './containers/commentContainer';
import SignIn from './components/signIn/signIn';
import Home from './components/home/home';

library.add(fab, faSpinner, faUpload, faExclamationTriangle)

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
          <CommentContainer />
          <SignIn />
          <Map
            handleCoordinates={this.handleCoordinates}
          />
        </div>
      </Router>
    );
  }
}

export default (App);