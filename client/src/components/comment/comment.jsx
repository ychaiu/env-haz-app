import React from 'react';

const Comment = (props) => {
    return (
        <div className="comment-content">
            <div>{props.text}</div>
            <div className = "comment-user-date">
                {props.firstName} {props.lastName}  
                    <span>{props.submitted}</span>
                <br />
                <br />
            </div>
        </div>
    )
};


export default (Comment);
