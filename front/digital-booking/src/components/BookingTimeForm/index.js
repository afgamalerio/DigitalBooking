import React, { useState } from 'react';
import './BookingTimeForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';


const BookingTimeForm = ({setSelectedTime}) => {

    const [value, setValue] = useState(null);
    const [selectValue, setSelectValue] = useState([]);

    const options = [];

    for (let index = 0; index <= 24; index++) {
        options.push({
            value: index,
            label: index
        })
    }

    const isSelected = (evento) => {

        setValue({
            value: evento.value,
            label: <p>Estaré llegando al alojamiento a la/s {evento.value}:00</p>
        })

        setSelectValue(evento.value)
        setSelectedTime(evento.value)
    }

    return (
        <>
            <h2 className="b-time-title">Tu horario de llegada</h2>

            <div className="b-time-container">
                <p>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    Tu habitación va a estar disponible entre las 10:00 AM y las 11:00 PM
                </p>
                <form className="form row">
                    <Select className="search-select"
                        placeholder={<p>Seleccione hora de llegada</p>}
                        options={options}
                        value={value}
                        onChange={isSelected}
                    />
                </form>
            </div>
        </>
    );
};

export default BookingTimeForm;