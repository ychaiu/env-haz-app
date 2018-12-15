import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class NavBar extends Component {
    render() {
        return (
            <div class="navbar navbar-expand-lg navbar-dark bg-dark">
                <span class="navbar-brand mb-0 h1">HAZMAP</span>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                     <li class="nav-item active">
                        <a href="#about" class="nav-link">About</a>
                    </li>
                    <li class="nav-item active">
                        <a href="/report-event" class="nav-link">Report</a>
                    </li>
                </ul>
                ))}
            </div>
        );
    }
}

export default NavBar;