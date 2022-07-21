import React from 'react';
import './GalleryModal.scss';
import ImageGallery from 'react-image-gallery';

const GalleryModal = ({ setRenderGallery, galleryImages }) => {

    return (

        <div className="gallery-modal-container" >

            <div onClick={() => setRenderGallery(false)} className="close-button">
                <h4>X</h4>
            </div>

            <div className="gallery">
                <ImageGallery
                    items={galleryImages}
                    showIndex={true}
                    slideInterval={3000}
                    showFullscreenButton={false}
                    showPlayButton={false}
                />
            </div>

        </div>
    );
};

export default GalleryModal;