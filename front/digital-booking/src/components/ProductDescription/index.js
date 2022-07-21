import React from 'react';
import './ProductDescription.scss';

const ProductDescription = ({ productData }) => {
    return productData ? (
        <div className="p-description-container">
            <h2>{productData.title_description}</h2>
            <div className="p-description">
                <p>{productData.description}</p>
            </div>
        </div>
    ) : null
};

export default ProductDescription;