import React from 'react';

const Comment = (props) => {
    return (
        <div className="comment-content">
            <div>{props.text}</div>
            <div className = "comment-user-date">
                {props.lastName}, {props.firstName} {props.submitted}
                <br />
                <br />
            </div>
        </div>
    )
};


export default (Comment);
