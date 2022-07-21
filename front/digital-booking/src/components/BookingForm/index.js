import React from 'react';
import './BookingForm.scss';
import { useFormik } from 'formik';

const BookingForm = ({ productData }) => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            vaxinated: false,
            comments: '',
        }
    });

    return (
        <>
            <h2 className="b-form-title">Completá tus datos</h2>
            <div className="b-form-container">
                <form onSubmit={formik.handleSubmit} className="b-form">
                    <div className="b-form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="disabled"
                            onChange={formik.handleChange}
                            value={localStorage.getItem('name')}
                        />
                    </div>

                    <div className="b-form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="disabled"
                            onChange={formik.handleChange}
                            value={localStorage.getItem('lastname')}
                        />

                    </div>
                    <div className="b-form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="disabled"
                            onChange={formik.handleChange}
                            value={localStorage.getItem('email')}
                        />
                    </div>
                    <div className="b-form-group">
                        <label htmlFor="city">Ciudad</label>
                        <input
                            id="city"
                            name="city"
                            type="disabled"
                            onChange={formik.handleChange}
                            value={productData.city?.name}
                        />
                    </div>
                    <div className="b-form-group">
                        <label htmlFor="city">Estoy vacunado contra el covid 19:</label>
                        <input
                            id="vaxinated"
                            name="vaxinated"
                            type="checkbox"
                            required
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="b-form-group">
                        <label htmlFor="city">Comentarios adicionales:</label>
                        <textarea
                            id="comments"
                            name="comments"
                            required
                            onChange={formik.handleChange}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default BookingForm;