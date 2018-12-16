import React, { Component } from 'react';
import EventFormContainer from './eventFormContainer';
import About from './about';

class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
          <EventFormContainer />
          <About />
      </div>
    );
  }
}

export default SideBar;
