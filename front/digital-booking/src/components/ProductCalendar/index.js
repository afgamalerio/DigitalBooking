import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../Button';
import CalendarProduct from '../CalendarProduct';
import './ProductCalendar.scss';

const ProductCalendar = ({ productData, setSelectedDates }) => {

    const [values, setValues] = useState(null);
    const [reservationLogin, setReservationLogin] = useState(false);
    const width = window.innerWidth;
    const history = useHistory();
    const datesNotAvailables = productData.reservations;

    useEffect(() => {
        if (localStorage.getItem('name') === null) {
            setReservationLogin(true)
        }
    }, [])


    return (
        <div className="p-calendar">
            <h3>Fechas disponibles</h3>
            <div className="p-calendar-container row">
                <CalendarProduct datesNotAvailables={datesNotAvailables} setSelectedDates={(dateValue) => setSelectedDates(dateValue)}/>
                <div className="p-calendar-container-cta">
                    <p>Agregá tus fechas de viaje para obtener precios exactos</p>
                    <Button
                        variant="button-full"
                        onClick={
                            reservationLogin ?
                                () => history.push({ pathname: `/login`,  dataFromCard: productData, reservationLogin: reservationLogin }) :
                                () => history.push({ pathname: `/product/${productData.id}/booking/`, dataFromCard: productData, reservationDates: values })}>
                        Iniciar reserva
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ProductCalendar;