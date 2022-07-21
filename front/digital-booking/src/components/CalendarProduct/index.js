import React, { useEffect, useState } from 'react';
import './CalendarProduct.scss';
import { Calendar } from "react-multi-date-picker"

const CalendarProduct = ({ datesNotAvailables, setSelectedDates }) => {

    const [values, setValues] = useState(null);
    const width = window.innerWidth;
    const selectedDates = values;
    const bookingDates = localStorage.getItem('bookingDates')

    const dates = []

    useEffect(() => {
        if (bookingDates) {
            let dateCI = new Date().setDate(new Date(bookingDates.substring(0, 10)).getDate() + 1)
            let dateC0 = new Date().setDate(new Date(bookingDates.substring(11, 22)).getDate() + 1)

            dates.push(dateCI, dateC0)

            setValues(dates)
            localStorage.removeItem('bookingDates')
        }

        setSelectedDates(values)
        
    }, [values])

    return (
        <>
            <div className="b-calendar-container">
                <Calendar
                    value={values}
                    onChange={setValues}
                    numberOfMonths={width > 768 ? 2 : 1}
                    disableMonthPicker
                    disableYearPicker
                    range
                    selected={selectedDates}

                    mapDays={({ date }) => {
                        let yesterday = new Date().setDate(new Date().getDate() - 1);

                        let disabled = false;
                        if (datesNotAvailables) {

                            datesNotAvailables.map((notAvailable, index) => (
                                (new Date(date.year + "-" + date.month.number + "-" + date.day) >= new Date(notAvailable.startDate) &&
                                    new Date(date.year + "-" + date.month.number + "-" + date.day) <= new Date(notAvailable.finishDate)) ?
                                    disabled = true : false

                            ))

                        }

                        //Deshabilita días anteriores al de hoy y las fechas ya reservadas
                        if (date < yesterday || disabled) return {
                            disabled: true,
                            style: { color: "#ccc" },
                            onClick: () => alert("Fecha no disponible")
                        }

                    }}
                />

            </div>
        </>
    );
};

export default CalendarProduct;