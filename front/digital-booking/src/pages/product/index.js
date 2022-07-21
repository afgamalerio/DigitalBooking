import React, { useEffect, useState } from 'react';
import './product.scss';
import Layout from '../../components/Layout';
import productsService from '../../services/products';
import ProductHeader from '../../components/ProductHeader';
import ProductDescription from '../../components/ProductDescription';
import ProductLocation from '../../components/ProductLocation';
import ProductGallery from '../../components/ProductGallery';
import ProductFeatures from '../../components/ProductFeatures';
import ProductCalendar from '../../components/ProductCalendar';
import ProductPolicies from '../../components/ProductPolicies';
import ProductMap from '../../components/ProductMap';
import GalleryModal from '../../components/GalleryModal';
import { useParams, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const Product = () => {

    const { id } = useParams();
    const { dataFromCard } = useLocation();
    const [productInfo, setProductInfo] = useState(null);
    const [renderGallery, setRenderGallery] = useState(false);
    const [galleryImages, setGalleryImages] = useState([])
    const [selectedDates, setSelectedDates] = useState(null);

    useEffect(() => {
        const getInfoData = async () => {
            try {
                const resProducts = await productsService.getProductsById(id)
                setProductInfo(resProducts)
                console.log(resProducts)

                // Sin usar el endpoint de getProductsById

               /* const resProducts = await productsService.getProducts()
                if (resProducts?.length) {
                    const resFilter = resProducts.find((p) => p.id === parseInt(id))
                    setProductInfo(resFilter)
                }*/

            } catch (error) {
                console.log(error)
            }
        }

        if (!dataFromCard) {
            getInfoData()
        } else {
            setProductInfo(dataFromCard)
        }

    }, [])


    //Mapea el array de imágenes del Back en la forma que debe ser leído por react-image-gallery

    useEffect(() => {
        const formatGallery = async () => {
            try {
                const images = []

                if (productInfo.images.length) {
                    productInfo.images.map((image, index) => (
                        images.push({
                            original: image.url,
                            thumbnail: image.url,
                        })
                    ))

                    setGalleryImages(images)
                }
            } catch (err) {
                console.log(err)
            }
        }

        formatGallery()

    }, [productInfo])


    return (
        <Layout>
            {productInfo ?
                <div className="product-container">
                    {galleryImages ?
                        renderGallery ? <GalleryModal galleryImages={galleryImages} setRenderGallery={setRenderGallery} />
                            : null
                        : null}
                    <ProductHeader productData={productInfo} />
                    <ProductLocation productData={productInfo} />
                    <div className="details-container">
                        <div className="row details-container-icons">
                            <FontAwesomeIcon icon={faHeart} className="icon-heart" />
                            <FontAwesomeIcon icon={faShareAlt} className="icon-share" />
                        </div>
                        <ProductGallery productData={productInfo} galleryImages={galleryImages} setRenderGallery={setRenderGallery} />
                        <ProductDescription productData={productInfo} />
                        <ProductFeatures productData={productInfo} />
                        <ProductCalendar productData={productInfo} setSelectedDates={(dateValue) => setSelectedDates(dateValue)}/>
                        <ProductMap productData={productInfo} />
                        <ProductPolicies productData={productInfo} />
                    </div>
                </div>
                : null}
        </Layout >
    );
};

export default Product;