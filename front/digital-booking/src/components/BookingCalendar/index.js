import React, { useState } from 'react';
import './BookingCalendar.scss';
import { Calendar } from "react-multi-date-picker"
import CalendarProduct from '../CalendarProduct';

const BookingCalendar = ({datesNotAvailables, setSelectedDates}) => {

    return (
        <>
            <h2 className="b-calendar-title">Seleccioná tu fecha de reserva</h2>
            <CalendarProduct datesNotAvailables={datesNotAvailables} setSelectedDates={(dateValue) => setSelectedDates(dateValue)} />
        </>
    );
};

export default BookingCalendar;