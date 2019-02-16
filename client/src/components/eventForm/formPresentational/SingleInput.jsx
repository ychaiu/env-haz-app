import React from 'react';

const SingleInput = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name} className="form-label" id={props.id}>
                {props.title}
            </label>
            <input
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                className={props.className}
            />
        </div>
    )

}

export default SingleInput;