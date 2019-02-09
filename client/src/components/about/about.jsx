import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

class About extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            counts: '',
        }
    }

    // const userCount = this.state.counts.user_counts;
    // const eventCount = this.state.counts.event_counts;

    componentDidMount() {
        fetch('http://localhost:5000/api/get_event_count')
            .then(function(response) {
                if(response.ok) {
                return response.json()} 
            })
            .then(data => {this.setState({counts:data})}
            )    
    }

  render() {
    console.log(this.state);
    return (
        <div id="sidebar">
            <div className ="sidebar-header-box" id="about-sidebar-image">
                <div className="sidebar-header">
                    <h3>About This Tool</h3>
                </div> 
            </div>
            {}
            <div className="about-content">
                <div id="about-stats">
                    <img id="about-haz-icon" src="https://res.cloudinary.com/ychaiu/image/upload/v1549654443/markers/toxic-sign_3.svg"/>
                    <div id="about-stats-users">{this.state.counts.users_count} Active Users</div>
                    <div id="about-stats-events">{this.state.counts.events_count} Reported Events</div>
                </div>
                <p id="about-description"><b>HAZMAP</b> is a community-driven effort to bring awareness to environmental issues in our neighborhoods. This does not replace
                    the need to alert governing agencies about these hazards, but this map provides residents with
                    additional information to protect themselves and their loved ones.</p>
                <p id="about-source">HAZMAP was created by Yessenia Chaiu Zhang for the Hackbright Academy Final Project. Last updated February 2019.</p>
            </div>
        </div>
    );
  }
}

export default About;