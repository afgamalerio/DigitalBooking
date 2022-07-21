import React from 'react';
import './Icon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Icon = ({ name }) => {

    return (
        <>
            <FontAwesomeIcon icon ={name} className="feature-icon" />
        </>
    );
};

export default Icon;