import React from 'react';

const Photo = (props) => {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={props.name}>{props.title}</label>
            <input
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
             />
        </div>
    )
}

export default Photo;