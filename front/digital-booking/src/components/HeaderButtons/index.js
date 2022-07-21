import React from 'react';
import './HeaderButtons.scss';
import { useHistory, useLocation } from "react-router";
import Button from '../Button';


const HeaderButtons = () => {

    const history = useHistory();
    const location = useLocation();

    return (
        <header>
            <div className="row header-row">
                {location.pathname === "/login" ?
                    <div className="header-button-container row">
                        <Button className="header-button" variant="button-outlined" onClick={() => history.push("/signup")}>Crear cuenta</Button>
                    </div>
                    : location.pathname === "/signup" ?
                        <div className="header-button-container row">
                            <Button className="header-button" variant="button-outlined" onClick={() => history.push("/login")}>Iniciar Sesión</Button>
                        </div>
                        :
                        <div className="header-button-container row">
                            <Button className="header-button" variant="button-outlined" onClick={() => history.push("/signup")}>Crear cuenta</Button>
                            <Button className="header-button" variant="button-outlined" onClick={() => history.push("/login")}>Iniciar Sesión</Button>
                        </div>
                }
            </div>
        </header>
    );
};

export default HeaderButtons;