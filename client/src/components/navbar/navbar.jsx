import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventFormContainer from '../../containers/eventFormContainer.jsx';
import About from '../about/about.jsx';
import CommentContainer from '../../containers/commentContainer';


class NavBar extends Component {
    render() {
        return (
                <div>
                    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/about">
                        <img src="https://res.cloudinary.com/ychaiu/image/upload/v1546575684/logo/logo_white.png" className="d-inline-block align-top" width="30" height="30"></img>
                        &nbsp;&nbsp; HAZMAP 
                        </a>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                             <li className="nav-item active">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/report-event" className="nav-link">Report</Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/report-event" className="nav-link">Take Action</Link>
                            </li>

                        </ul>
                    </div>
                    <Route 
                        path="/about" 
                        component={About} 
                    />
                    <Route 
                        path="/report-event"
                        render={() => (
                            <EventFormContainer 
                                newMarker = {this.props.newMarker}
    
                            />
                        )}
                    />
                    <Route
                        path="/comments"
                        component={CommentContainer}
                    />
                </div>
        );
    }
}

export default NavBar;