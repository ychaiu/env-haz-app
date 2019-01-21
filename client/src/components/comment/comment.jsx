import React from 'react';

const Comment = (props) => {
    return (
        <div className="comment-content">
            <p>
            {props.text}
            </p>
        </div>
    )
};


export default (Comment);
