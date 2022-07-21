import React from 'react';
import './ProductHeader.scss';
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ProductHeader = ({ productData }) => {

    const history = useHistory();

    return productData ? (
        <div className="p-header-container row">
            <div className="left-container">
                <h5 className="left-container-subtitle">{productData.category.title}</h5>
                <h3 className="left-container-title">{productData.name}</h3>
            </div>
            <div className="right-container">
                <FontAwesomeIcon icon={faChevronLeft} className="icon-arrow" onClick={ () => history.goBack() } />
            </div>
        </div>
    ) : null
};

export default ProductHeader;