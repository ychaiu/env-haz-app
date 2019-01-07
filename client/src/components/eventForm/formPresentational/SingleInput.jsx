import React from 'react';

const SingleInput = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <input
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                className="form-control"
            />
        </div>
    )

}

export default SingleInput;