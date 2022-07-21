import React, { useEffect, useState } from 'react';
import './bookings.scss'
import Layout from '../../components/Layout';
import { useHistory, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faWifi, faSwimmer, faMapMarkerAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import productsService from '../../services/products';
import Card from '../../components/Card';

const Bookings = () => {

    const { id } = useParams();
    const [bookingsData, setBookingsData] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const getInfoData = async () => {
            try {
                const resProducts = await productsService.getProductsByUserId(localStorage.getItem("id"))
                console.log("bookingss", resProducts)
                setBookingsData(resProducts)

            } catch (error) {
                console.log(error)
            }
        }

        getInfoData()

    }, [])

    console.log(bookingsData)

    return (
        <Layout>
            <div className="bookings-container">
                <h3>Mis reservas</h3>
                <div className="bookings-wrapper">
                    {bookingsData.length ? bookingsData.map((booking, index) => (
                        <div className="bookings-details-container">
                            <div className="bookings-details">
                                <h3>Tu viaje a {booking.product.city?.name}, {booking.product.city?.country_name}</h3>
                                <p>Check In: {booking.startDate.substring(0, 10)}</p>
                                <p>Check Out: {booking.finishDate.substring(0, 10)}</p>
                            </div>
                            <div className="bookings-card-container">
                                <h4>Información del alojamiento</h4>
                                <Card productData={booking.product} />
                            </div>
                        </div>
                    )) :

                        <div div className="no-bookings-container">
                            <h3>¡Parece que no tienes reservas!</h3>
                            <p>Tu próxima experiencia está en Digital Booking</p>
                            <Button onClick={() => history.push("/")} className="card-button" variant="button-full" >Ver productos</Button>
                        </div>

                    }
                </div>
            </div>
        </Layout>
    );
};

export default Bookings;