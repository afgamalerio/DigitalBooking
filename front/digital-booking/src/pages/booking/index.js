import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './booking.scss'
import Layout from '../../components/Layout';
import ProductHeader from '../../components/ProductHeader';
import BookingForm from '../../components/BookingForm';
import BookingCalendar from '../../components/BookingCalendar';
import BookingDetails from '../../components/BookingDetails';
import BookingTimeForm from '../../components/BookingTimeForm';
import ProductPolicies from '../../components/ProductPolicies';

const Booking = () => {

    const { dataFromCard } = useLocation();
    const [productInfo, setProductInfo] = useState(null);
    const [selectedDates, setSelectedDates] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        setProductInfo(dataFromCard)
    }, [])

    console.log("booking page selectedTime", selectedTime)
    console.log("booking page selectedDates", selectedDates)


    return (
        <Layout>
            {productInfo ?
                <div className="main-container-b">
                    <ProductHeader productData={productInfo} />
                    <div className="row booking-container">
                        <div className="booking-form-container">
                            <BookingForm productData={productInfo} />
                            <BookingCalendar datesNotAvailables={productInfo.reservations} setSelectedDates={(dateValue) => setSelectedDates(dateValue)} />
                            <BookingTimeForm setSelectedTime={(timeValue) => setSelectedTime(timeValue)} />
                        </div>
                        <div className="booking-details-container">
                            <BookingDetails productData={productInfo} selectedTime={selectedTime} selectedDates={selectedDates} />
                        </div>
                    </div>
                    <ProductPolicies className="booking-policies" productData={productInfo} />
                </div>
                : null}
        </Layout>
    );
};

export default Booking;