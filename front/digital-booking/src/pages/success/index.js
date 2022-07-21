import React from 'react';
import './successfulBooking.scss';
import { useHistory, useLocation } from "react-router";
import Layout from '../../components/Layout';
import Button from '../../components/Button';

const SuccessfulBooking = ({ }) => {
    const history = useHistory();
    const { successData } = useLocation();

    return (
        <Layout>
            <div className="main-container">
                <div className="successful-booking-container">
                    <iframe src="https://embed.lottiefiles.com/animation/46690"></iframe>
                    <h2>¡Muchas gracias!</h2>
                    <p>{successData}</p>
                    <Button onClick={() => history.push("/")} className="card-button" variant="button-full" > Volver al home </Button>
                </div>
            </div>
        </Layout>
    );
};

export default SuccessfulBooking;