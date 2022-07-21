import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-text-container">
                    <p className="footer-text">©2021 Digital Booking</p>
                </div>
                <div className="footer-social-container row">
                    <FontAwesomeIcon icon={faFacebook} className="footer-social-icon" />
                    <FontAwesomeIcon icon={faLinkedin} className="footer-social-icon" />
                    <FontAwesomeIcon icon={faTwitter} className="footer-social-icon" />
                    <FontAwesomeIcon icon={faInstagram} className="footer-social-icon" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;