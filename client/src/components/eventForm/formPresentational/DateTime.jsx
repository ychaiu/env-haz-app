import React from 'react';
import Datetime from 'react-datetime';

const DateTimeInput = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.title}</label>
            <Datetime
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
             />
        </div>
    )
}

export default DateTimeInput;