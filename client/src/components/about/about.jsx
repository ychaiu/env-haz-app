import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
        <div id="sidebar">
            <div className ="sidebar-header-box" id="about-sidebar-image">
                <div className="sidebar-header">
                    <h3>About This Tool</h3>
                </div> 
            </div>
            <div className="about-content">
                <p>Contribute to your community by reporting environmental hazards in your neighborhood.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    );
  }
}

export default About;