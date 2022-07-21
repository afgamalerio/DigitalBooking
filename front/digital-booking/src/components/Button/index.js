import React from 'react';
import './Button.scss';

const Button = ( props) => {

    return (
        <button {...props} className={`${props.variant} ${props.className}`}>
            {props.children}
        </button>
    );
};

export default Button;