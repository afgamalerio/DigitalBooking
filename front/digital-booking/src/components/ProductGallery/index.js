import React, { useEffect, useState } from 'react';
import './ProductGallery.scss';
import ImageGallery from 'react-image-gallery';


const ProductGallery = ({ productData, setRenderGallery, galleryImages }) => {
    const width = window.innerWidth;

    return (
        <div>
            {productData ?
                width > 768 ?
                    <div className="p-gallery-container row">
                            <div className="p-gallery-container-principal">
                                <img src={productData.images[0].url} alt="Imagen hotel" className="p-gallery-container-principal-img" />
                            </div>
                            <div className="p-gallery-container-secondary">

                                {productData.images.slice(1, 5).map((image, index) => (
                                    <img src={image.url} alt={image.title} className="p-gallery-container-secondary-img" key={index} />
                                ))}

                                {/* Botón ver más */}
                                <p className="p-gallery-button" onClick={() => setRenderGallery(true)}>Ver más</p>
                            </div>
                    </div>
                    :
                    <div className="gallery">
                        {galleryImages ? 
                        <ImageGallery
                            items={galleryImages}
                            showIndex={true}
                            slideInterval={3000}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            showThumbnails={false}
                            showNav={false}
                            autoPlay={true}
                        /> : null }
                    </div>
                : null}
        </div>
    );

};

export default ProductGallery;