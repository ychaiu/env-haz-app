import React from 'react';

const Comment = (props) => {
    return (
        <div className="comment-content">
            <div className = "comment-text">{props.text}</div>
            <div className = "comment-user">
                {props.firstName} {props.lastName}, {props.submitted}
                <br />
                <br />
            </div>
        </div>
    )
};


export default (Comment);
