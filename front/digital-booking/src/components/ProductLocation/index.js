import React from 'react';
import './ProductLocation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Rating from '../Rating';

const ProductLocation = ({ productData }) => {
    return productData ? (
        <div className="p-location-container  row">
            <div className="p-location-container-right">
                <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-location" /> {productData.city?.name}, {productData.city?.country_name} </p>
                <p>A 980 m del centro</p>
            </div>
            <div className="p-location-container-left row">
                <div className="p-location-container-left-text">
                    <p>Muy bueno</p>
                    <Rating productRating={productData.rating} />
                </div>
                <div className="p-location-container-left-score">
                    <p>8</p>
                </div>
            </div>
        </div>
    ) : null
};

export default ProductLocation;