import React from 'react';
import './administration.scss'
import Layout from '../../components/Layout';
import AdminProductForm from '../../components/AdminProductForm';
import AdminProductHeader from '../../components/AdminProductHeader';

const Administration = () => {
    return (
        <Layout>
            <div className="admin-main-container">
                <AdminProductHeader />
                <div className="admin-container">
                    <h2>Administración de productos</h2>
                    <AdminProductForm />
                </div>
            </div>
        </Layout>
    );
};

export default Administration;