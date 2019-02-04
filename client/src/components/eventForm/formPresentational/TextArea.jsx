import React from 'react';

const TextArea = (props) => (
  <div className="form-group">
    <label className={props.classNameTitle}>{props.title}</label>
    <textarea
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      className={props.className}
    />
  </div>
);

export default TextArea;  