import React from "react";
import "./Drawer.scss";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import HeaderAvatar from "../HeaderAvatar";

const Drawer = ({ setOpen, isLogged, logout }) => {

    const history = useHistory();
    const location = useLocation();

    return (
        <div className="drawer-container">
            <div className="top-drawer">
                <div onClick={() => setOpen(false)}>
                    <h4>X</h4>
                </div>
                <div className="top-drawer-menu">
                    {isLogged ? <HeaderAvatar logout={logout} /> : <h4>MENU</h4>}
                </div>
            </div>
            <div className="bottom-drawer">
                {isLogged ?
                    <div className="logout" onClick={() => window.confirm("¿Cerrar sesión?") ? logout() : null} >
                        <p>Cerrar sesión</p>
                    </div>
                    :
                    location.pathname === "/" ?
                        <div className="bottom-drawer-options">
                            <div className="menu-drawer" onClick={() => history.push("/login")} >
                                <p>Iniciar sesión</p>
                            </div>
                            <hr />
                            <div className="menu-drawer" onClick={() => history.push("/signup")} >
                                <p>Crear cuenta</p>
                            </div>
                        </div>
                        : location.pathname === "/login" ?
                            <div className="menu-drawer" onClick={() => history.push("/signup")} >
                                <p>Crear cuenta</p>
                            </div>
                            :
                            <div className="menu-drawer" onClick={() => history.push("/login")} >
                                <p>Iniciar sesión</p>
                            </div>
                }
                <div className="social-container row">
                    <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                    <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                    <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                    <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                </div>
            </div>

        </div>
    );
};

export default Drawer;