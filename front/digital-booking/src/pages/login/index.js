import React from 'react';
import { useLocation } from 'react-router';
import Layout from '../../components/Layout';
import LoginForm from '../../components/LoginForm';
import Swal from 'sweetalert2'
import "./login.scss"

const Login = () => {

    const { reservationLogin } = useLocation();

    if (reservationLogin) {
        Swal.fire({
            text: 'Debes iniciar sesión para reservar',
            confirmButtonColor: "#FBC02D",
        })
    }

    return (
        <Layout>
            <div className="main-container">
                <LoginForm reservationLogin={reservationLogin}/>
            </div>
        </Layout>
    );
};

export default Login;