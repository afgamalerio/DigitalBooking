import React from 'react';
import './HeaderAvatar.scss';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const HeaderAvatar = ({ logout }) => {

    const admin = localStorage.getItem('rol') === 'ROLE_ADMIN' ? true : false;
    const username = localStorage.getItem("name");
    const userlastname = localStorage.getItem("lastname");
    const userId = localStorage.getItem("id");
    const initials = username?.charAt(0) + userlastname?.charAt(0);
    const history = useHistory()

    const logoutUser = () => {
        Swal.fire({
            text: "¿Cerrar sesión?",
            confirmButtonColor: "#FBC02D",
            showDenyButton: true,
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
            }
        })
    }

    return (
        <div className="row header-avatar-row">
            {admin ?
                <p onClick={() => history.push("/administration")} className="header-avatar-userButton" >Cargar productos</p>
                :
                <p onClick={() => history.push(`/${userId}/bookings`)} className="header-avatar-userButton" >Mis reservas</p>
            }
            <div className="header-avatar-letters">
                {/* $iniciales */}
                <h4>{initials}</h4>
            </div>
            <div className="header-avatar-text">
                <h5>Hola,</h5>
                <h5 className="header-avatar-text-name">{username + " " + userlastname}</h5>
            </div>
            <div>
                {/* <h4 className="header-avatar-logout" onClick={() => window.confirm("¿Cerrar sesión?") ? logout() : null}>X</h4> */}
                <h4 className="header-avatar-logout" onClick={() => logoutUser()}>X</h4>
            </div>
        </div>
    );
};

export default HeaderAvatar;