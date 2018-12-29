import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventFormContainer from '../../containers/eventFormContainer.jsx';
import About from '../about/about.jsx';

class NavBar extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <span class="navbar-brand mb-0 h1">HAZMAP</span>
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                             <li class="nav-item active">
                                <Link to="/about" class="nav-link">About</Link>
                            </li>
                            <li class="nav-item active">
                                <Link to="/report-event" class="nav-link">Report</Link>
                            </li>
                        </ul>
                    </div>
                    <Route path="/about" component={About} />
                    <Route path="/report-event" component={EventFormContainer} />
                </div>
            </Router>
        );
    }
}

export default NavBar;