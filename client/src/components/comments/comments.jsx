import React, { Component } from 'react';

class Comment extends Component {

let eventId = this.props.eventId;
let APIURL = "http://localhost:5000/api/render_comments/";

componentDidMount() {
    fetch(APIURL + eventId)
        .then(response => response.json())
        .then(data => )
    }


  render() {
    return (
        <div id="sidebar">
            <div className="sidebar-header">
                <h3>{this.props.title}</h3>
            </div> 
            <div className="comment-content">
                <p>Comments about this event.</p>
            </div>
        </div>
    );
  }
}

export default Comment;