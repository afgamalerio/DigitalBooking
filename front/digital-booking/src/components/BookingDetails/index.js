import React, { useEffect, useState } from 'react';
import './BookingDetails.scss';
import { useHistory } from "react-router";
import Rating from '../Rating';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import userService from '../../services/users';
import Swal from 'sweetalert2'

const BookingDetails = ({ productData, selectedDates, selectedTime }) => {

    const history = useHistory()
    const [startDate, setStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedDates) {
            setStartDate(selectedDates[0]?.year + '-' + selectedDates[0]?.month.number + '-' + selectedDates[0]?.day)
            setFinishDate(selectedDates[1]?.year + '-' + selectedDates[1]?.month.number + '-' + selectedDates[1]?.day)
        }

    }, [selectedDates])


    const postReservation = async () => {
        const time = new Date(startDate).setTime(selectedTime)
        const start = new Date(startDate)
        const end = new Date(finishDate)

        console.log("time: ", time)

        const reservation = {
            startHour: time,
            startDate: start,
            finishDate: end,
            product: { id: productData.id },
            user: {
                id: localStorage.getItem('id'),
                name: localStorage.getItem('name'),
                lastname: localStorage.getItem('lastname'),
                email: localStorage.getItem('email')
            }
        }

        console.log("reservation", reservation)
        console.log("user", reservation.user.id)
        console.log("product", reservation.product.id)

        try {
            setLoading(true)
            const data = await userService.postReservation(reservation);

            console.log("status: ", data.status)

            if (data.status === 201) {

                const email = {
                    email: localStorage.getItem('email'),
                    content: `<body style="width: 100%;">
                    <table style="border-collapse:collapse;border:0;border-spacing:0; ">
                        <tr>
                            <td>
                                <h1
                                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0; font-family: Poppins; margin-bottom: 0; color: #263238;">
                                    ¡Felicidades!</h1>
                                <p
                                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0; font-family: Poppins; margin-top: 6px; color: #263238;">
                                    Tu
                                    reserva se ha realizado correctamente</p>
                                <ul style="font-family: Poppins; color: #263238;">
                                    <li><b>Hospedaje:</b> ${productData.category.title} ${productData.name}</li>
                                    <li><b>Ciudad:</b> ${productData.city.name}, ${productData.city.country_name}</li>
                                    <li><b>Fecha de entrada:</b> ${startDate} ${selectedTime}:00hs</li>
                                    <li><b>Fecha de salida:</b> ${finishDate}</li>
                                </ul>
                                <b
                                    style="width:100%;border-collapse:collapse;border:0;border-spacing:0; font-family: Poppins; color: #263238;">Gracias
                                    por elegir Digital Booking</b>
                            </td>
                        </tr>
                        <tr style="width:100%;border-collapse:collapse;border:0;border-spacing:0; background-color:#FFFBE2;">
                            <td>
                                <a href="http://digitalbookingpig1.click/">
                                    <img src="
                            https://pig1bucket.s3.amazonaws.com/imagenes%20producto/logo.png" alt="Logo Digital Booking"
                                        style="width: 120px; margin: 10px;" />
                                </a>
                            </td>
                        </tr>
                    </table>
                </body>`,
                    subject: "Reserva Exitosa"
                }

                const dataEmail = await userService.sendEmail(email)
                history.push({ pathname: `/product/${productData.id}/booking/success`, successData: `Su reserva para el alojamiento se ha realizado con éxito` })
            }


        } catch (error) {
            console.log(error)
            Swal.fire({
                text: "No se pudo crear la reserva, intente nuevamente más tarde.",
                confirmButtonColor: "#FBC02D",
            })
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div className="b-details-container">
                <h2 className="b-details-title">Detalle de la reserva</h2>
                <div className="b-details-img-description">
                    <img src={productData.images[0].url} alt="Imagen hotel" className="b-img" />
                    <div className="b-description">
                        <h4 className="category">{productData?.category.title}</h4>
                        <h2 className="title">{productData?.name}</h2>
                        <Rating productRating={productData.rating} />
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} className="icon-location" /> {productData.city.name}, {productData.city.country_name}
                        </p>
                        <div className="b-check">
                            <p>Check in</p>
                            <p>{startDate ? startDate : null}</p>
                        </div>
                        <div className="b-check">
                            <p>Check out</p>
                            <p>{finishDate ? finishDate : null}</p>
                        </div>
                        {loading ? <p>Procesando reserva, por favor aguarde... </p> : null}
                        <Button
                            onClick={!loading ? () => postReservation() : null}
                            className="details-button"
                            variant="button-full" > Hacer reserva </Button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingDetails;