import React from 'react';

const SingleInput = (props) => (
    <div className="form-item">
        <label className="form-title">{props.title}</label>
            <input
                className="form-single-input"
                name={props.name}
                type={props.inputType}
                value={props.content}
                onChange={props.controlFunc}
                placeholder={props.placeholder} />
    </div>
);

SingleInput.propTypes = {
    inputType: React.PropTypes.oneOf(['text', 'number']).isRequired,
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    controlFunc: React.PropTypes.func.isRequired,
    content: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    placeholder: React.PropTypes.string,
}; 

export default SingleInput;