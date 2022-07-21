import React from 'react';
// import Icon from '../Icon';
import './ProductFeatures.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductFeatures = ({ productData }) => {

    return (

        <div className="features-container">
            <h2>¿Qué ofrece este lugar?</h2>
            <div className="features-container-description">
                {productData.features.length ?
                    productData.features.map((feature, index) => (
                        <div className="features-description">
                            <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                            <p>{feature.name}</p>
                        </div>
                    ))
                    : null
                }
            </div>
        </div>
    );
};

export default ProductFeatures;