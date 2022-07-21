import React from 'react';
import './Card.scss';
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWifi, faSwimmer, faMapMarkerAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import Rating from '../Rating';
import Button from '../Button';

const Card = ({ productData }) => {

    const history = useHistory()

    return (
        <div className="row card-container">
            <div className="card-container-img">
                {productData.images ?
                    <>
                        <img src={productData.images[0].url} alt="Imagen hotel" className="card-img" />
                        <FontAwesomeIcon icon={faHeart} className="icon-heart" />
                    </>
                    : <div className="card-img empty"><FontAwesomeIcon icon={faImage} className="icon-image" /></div>}
            </div>

            <div className="card-container-text">
                <div className="row card-title-score">

                    <div className="card-title">
                        <div className="card-category row">
                            {/* category */}
                            <h4 className="category">{productData?.category.title}</h4>
                            <Rating productRating={productData.rating} />
                        </div>
                        <div>
                            {/* title */}
                            <h2 className="title">{productData?.name}</h2>
                        </div>
                    </div>

                    <div className="card-score">
                        {/* puntuación */}
                        <p>8</p>
                        <h5>Muy Bueno</h5>
                    </div>

                </div>

                <div className="row">
                    <div className="location">
                        {/* location */}
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-location" /> A 940 m del centro <span className="location-link" onClick={() => history.push({ pathname: `/product/${productData.id}`, dataFromCard: productData })}>MOSTRAR EN EL MAPA</span></p>
                    </div>
                </div>

                <div className="row">
                    {productData.features.length ?
                        productData.features.map((feature, index) => (
                            <div className="row">
                                <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
                            </div>
                        ))
                        : null}
                </div>

                <div className="row description-div">
                    {/* description */}
                    <p className="description">{productData?.description.substring(0, 120)} <span className="description-link" onClick={() => history.push({ pathname: `/product/${productData.id}`, dataFromCard: productData })}> más... </span></p>
                </div>

                <div className="row">
                    <Button onClick={() => history.push({ pathname: `/product/${productData.id}`, dataFromCard: productData })} className="card-button" variant="button-full" >Ver más</Button>
                </div>
            </div>
        </div>
    );
};

export default Card;