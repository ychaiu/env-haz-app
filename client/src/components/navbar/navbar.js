import React, { Component } from 'react';
import '../../navbar.css';

class NavBar extends Component {
    render() {
        return (
            <div class="navbar navbar-dark bg-dark">
              <a href="#tool-tip">Tool Tip</a>
              <a href="#sign-in">Sign In</a>
            </div>
        );
    }
}

export default NavBar;