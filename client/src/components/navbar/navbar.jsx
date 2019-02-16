import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import EventFormContainer from '../../containers/eventFormContainer.jsx';
import About from '../about/about.jsx';
import TakeAction from '../takeAction/takeAction';
import { connect } from 'react-redux';
import { openSignIn } from '../../redux/actions/openSignIn';
import { openSignUp } from '../../redux/actions/openSignUp';



class NavBar extends Component {
    constructor(props) {
        super(props);    

        this.handleSignIn = this.handleSignIn.bind(this);
      }

    handleSignIn (evt){
        evt.preventDefault();
        this.props.openSignIn(true);
    }

    render() {
        return (
                <div>
                    <div className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                            <NavLink className="navbar-brand" to="/about">
                            <img src="https://res.cloudinary.com/ychaiu/image/upload/v1546575684/logo/logo_white.png" className="d-inline-block align-top" width="30" height="30"></img>
                            &nbsp;&nbsp; HAZMAP 
                            </NavLink>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <NavLink to="/about" className="nav-link" activeStyle={{fontWeight: "bold", color: "#e2aa00", textDecoration: "underline"}}>About</NavLink>
                                </li>
                                <li className="nav-item active">
                                    <NavLink to="/report-event" className="nav-link" activeStyle={{fontWeight: "bold", color: "#e2aa00", textDecoration: "underline"}}>Report</NavLink>
                                </li>
                                <li className="nav-item active">
                                    <NavLink to="/take-action" className="nav-link" activeStyle={{fontWeight: "bold", color: "#e2aa00", textDecoration: "underline"}}>Take Action</NavLink>
                                </li>
                            </ul>
                        </div>
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
                        path="/take-action"
                        component={TakeAction}
                    />
                </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    openSignIn: (state) => dispatch(openSignIn(state)),
})

export default withRouter(connect(null, mapDispatchToProps)(NavBar));