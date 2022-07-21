import React, { useEffect, useState } from 'react';
import './Header.scss';
import { useHistory } from "react-router";
import HeaderButtons from '../HeaderButtons';
import HeaderAvatar from '../HeaderAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Drawer from '../Drawer';


const Header = () => {

    const history = useHistory();
    const [isLogged, setIsLogged] = useState(false);
    const [open, setOpen] = useState(false);
    const width = window.innerWidth;

    useEffect(() => {
        if (localStorage.name) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, [localStorage.length])

    const logout = () => {
        localStorage.clear();
        setIsLogged(false)
    }

    return (
        <header>
            <div className="header-container">
                <div className="row header-row">
                    <div className="header-logo-main-container">
                        <div onClick={() => history.push("/")} className="header-logo-container">
                            <img src="/assets/logo.svg" alt="Logo Digital Booking" className="header-logo" />
                            <i className="header-title">Sentite como en tu hogar</i>
                        </div>
                    </div>
                    {width >= 760 ?
                        isLogged ? <HeaderAvatar logout={logout} /> : <HeaderButtons />
                        :
                        <FontAwesomeIcon icon={faBars} className="header-button-burguer" onClick={() => setOpen(true)} />
                    }
                    
                    {open ? <Drawer setOpen={setOpen} isLogged={isLogged} logout={logout} /> : null}
                </div>
            </div>
        </header>
    );
};

export default Header;