import React from 'react';

const Button = (props) => {
    return(
        <button 
            className="button"
            style= {props.style} 
            onClick= {props.action}>    
            {props.title} 
        </button>)
}

export default Button;