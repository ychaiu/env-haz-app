import React, { Component } from 'react';

let eventId = 71;
let APIURL = "http://localhost:5000/api/render_comments/";

class Comment extends Component {

    componentDidMount() {
        fetch(APIURL + eventId)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(data => this.displayComments(data));
    }

    displayComments = (data) => {
        console.log(data);
    }

    render() {
        return(
            <div id = "sidebar" >
                <div className="sidebar-header">
                    <h3>TITLE</h3>
                </div>
                <div className="comment-content">
                    <ul>something</ul>
                </div>
            </div>
    )};
}

export default Comment;