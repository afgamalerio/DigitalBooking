import React from 'react';
import Layout from '../../components/Layout';
import Register from '../../components/RegisterForm';
import "./signup.scss"

const Signup = () => {
    return (
        <Layout>
            <div className="main-container">
                <Register/>
            </div>
        </Layout>
    );
};

export default Signup;