import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
        <div id="sidebar">
            <div className="sidebar-header">
                <h3>{this.props.title</h3>
            </div> 
            <div className="comment-content">
                <p>Comments about this event.</p>
            </div>
        </div>
    );
  }
}

export default Comment;