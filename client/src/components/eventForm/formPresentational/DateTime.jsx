import React from 'react';
import Datetime from 'react-datetime';

const DateTimeInput = (props) => {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={props.name}>{props.title}</label>
            <Datetime
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                inputProps={{ placeholder: "Select a Date and Time"}}
             />
        </div>
    )
}

export default DateTimeInput;