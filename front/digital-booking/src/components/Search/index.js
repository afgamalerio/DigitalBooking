import React, { useEffect, useState } from "react";
import "./search.scss";
import Calendar from "../Calendar";
import Button from "../Button";
import Select from 'react-select';
import citiesService from "../../services/cities";
import SelectOption from "../SelectOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'

const Search = ({ setFilter, loading, cleanFilter }) => {

    const options = []
    const dates = []

    const [citiesData, setCitiesData] = useState([]);
    const [selectValue, setSelectValue] = useState([]);
    const [calendarValues, setCalendarValues] = useState([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        console.log("calendarValues: " , calendarValues);

        if (calendarValues) {
                calendarValues.map((date, index) => (
                    dates[index] = date.format("YYYY-MM-DD")
                ))
        }
        console.log("dates: " , dates);

    }, [calendarValues])

    const search = () => {

        if (dates.length == 0) {
            console.log("busqueda x ciudad")
            setFilter({ type: "city", data: { city: selectValue.cityId, cityName: selectValue.cityName } })
        } else if (selectValue.length != 0) {
            console.log("busqueda x fecha y ciudad")
            setFilter({ type: "cityDates", data: { city: selectValue.cityId, cityName: selectValue.cityName, dates: dates } })
        } else {
            console.log("busqueda x fechas")
            setFilter({ type: "dates", data: {dates} })
        }

        localStorage.setItem('bookingDates', [dates])
    }

    useEffect(() => {
        const getInfoData = async () => {
            try {
                const resCities = await citiesService.getCities();
                setCitiesData(resCities);

            } catch (err) {
                Swal.fire({
                    text: "Ocurrió un error al conectarse con el servidor, por favor intenta nuevamente más tarde",
                    confirmButtonColor: "#FBC02D",
                })
                console.log(err)
            }
        }
        getInfoData();

    }, [])

    citiesData.map((location, index) => (
        options.push({
            value: location.id,
            label: <SelectOption ciudad={location.name} pais={location.country_name} key={index} />
        })
    ))

    const isSelected = (evento) => {
        setValue({
            value: evento.value,
            label:
                <div className="row" className="option-selected">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="option-icon" />
                    <p>{evento.label.props.ciudad}, {evento.label.props.pais}</p>
                </div>
        })

        setSelectValue({
            cityId: evento.value,
            cityName: evento.label.props.ciudad
        })
    }

    useEffect(() => {
        if(cleanFilter === true){
            setValue(null);
            setSelectValue([]);
            setCalendarValues([]);
        }

    }, [cleanFilter])

    return (
        <div className="search-container">
            <div className="row">
                <h2>Busca ofertas en hoteles, casas y mucho más</h2>
            </div>
            <div className="form-container">
                <form className="form row">
                    <Select className="search-select"
                        placeholder={
                            <p>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="option-icon" />
                                ¿A dónde vamos?
                            </p>
                        }
                        options={options}
                        value={value}
                        onChange={isSelected}
                    />
                    <Calendar setCalendarValues={setCalendarValues} cleanFilter={cleanFilter} className="calendar" />
                </form>
                <Button onClick={!loading ? () => search() : null} variant="button-full" className="search-button">Buscar</Button>
            </div>
        </div>
    );
};

export default Search;