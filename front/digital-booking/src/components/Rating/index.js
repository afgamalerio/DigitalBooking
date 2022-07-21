import React from 'react';
import './Rating.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ productRating }) => {

    const stars = Array.from({ length: productRating }, (_, i) => i + 1)
    const disabledStars = Array.from({ length: 5 - stars.length }, (_, i) => i + 1);

    return (
        <>
            {stars.map((star, index) => (
                <FontAwesomeIcon icon={faStar} className="icon-star" key={index} />
            ))}

            {disabledStars.map((disabledStar, index) => (
                <FontAwesomeIcon icon={faStar} className="icon-star-disabled" key={index} />
            ))}
        </>
    );
};

export default Rating;