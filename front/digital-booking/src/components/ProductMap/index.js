import React, { useEffect } from 'react';
import './ProductMap.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const ProductMap = ({ productData }) => {

    const coordinates = [productData.latitude, productData.longitude];

    return (
        <div className="p-map-container">
            <h2>¿Dónde vas a estar?</h2>
            <div className="map-container">
                <p>{productData.city.name}, {productData.city.country_name}</p>
                <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false} id="map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coordinates}>
                        <Popup>
                            {productData.name}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
};

export default ProductMap;