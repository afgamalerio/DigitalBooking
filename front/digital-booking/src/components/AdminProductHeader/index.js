import React from 'react';
import './AdminProductHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';

const AdminProductHeader = () => {

    const history = useHistory()
    
    return (
        <div className="admin-form-header row">
            <h4>Administración</h4>
            <FontAwesomeIcon icon={faChevronLeft} className="icon-arrow" onClick={() => history.goBack()} />
        </div>
    );
};

export default AdminProductHeader;