import React from 'react';
import './ProductPolicies.scss';

const ProductPolicies = ({ productData }) => {

    const policies = {
        rules: {
            title: "Normas de la casa",
            description: productData.policies.rules.split(";")
        },
        security: {
            title: "Salud y seguridad",
            description: productData.policies.security.split(";")
        },
        cancellation: {
            title: "Política de cancelación",
            description: productData.policies.cancellation.split(";")
        }
    }

    return (
        <div className="policies-container">
            <h2>Qué tenés que saber</h2>
            <div className="policies-container-description">
                <div className="policies-description">
                    <h3>{policies.rules.title}</h3>
                    <ul>
                        {policies.rules.description.map((rule, index) =>
                            <li key={index}>{rule}</li>
                        )}
                    </ul>
                </div>
                <div className="policies-description">
                    <h3>{policies.security.title}</h3>
                    <ul>
                        {policies.security.description.map((rule, index) =>
                            <li key={index}>{rule}</li>
                        )}
                    </ul>
                </div>
                <div className="policies-description">
                    <h3>{policies.cancellation.title}</h3>
                    <ul>
                        {policies.cancellation.description.map((rule, index) =>
                            <li key={index}>{rule}</li>
                        )}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ProductPolicies;