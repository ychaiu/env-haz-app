import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Map from './components/map/map.jsx';
import NavBar from './components/navbar/navbar.jsx';
import SideBar from './containers/sidebar/sideBar.jsx'

// const routes = [
//   { path: '/report-event',
//     exact: true,
//     sidebar: () => <EventFormContainer />,
//     main: () => <Map />
//   }
// ]

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar />
          <Map />
          <SideBar />
      </div>
    );
  }
}

export default App;
