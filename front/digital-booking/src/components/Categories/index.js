import React from 'react';
import { useEffect, useState } from "react";
import './Categories.scss';
import categoryService from '../../services/categories';
import Swal from 'sweetalert2'

const Categories = ({ loading, setFilter, cleanFilter }) => {

    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        const getInfoData = async () => {
            try {
                const resCategories = await categoryService.getCategories();

                setCategoriesData(resCategories);

            } catch (err) {
                Swal.fire({
                    text: "Ocurrió un error al conectarse con el servidor, por favor intenta nuevamente más tarde",
                    confirmButtonColor: "#FBC02D",
                })
                console.log(err)
            }
        }
        getInfoData();
    }, [])

    return (
        <div className="categories-container">
            <div className="row">
                <div>
                    <h3>Buscar por tipo de alojamiento</h3>
                </div>
            </div>
            <div className="categories-card-row row">
                {categoriesData.length ?
                    categoriesData.map((category, index) => (

                        // <div className="categories-card" key={index} onClick={() => !loading ? setFilterCategory(category.id) : null}>
                        <div className="categories-card" key={index} onClick={() => !loading ? setFilter({type : "category", data: category.id}) : null}>
                            <img src={category.img} className="categories-card-image" alt={category.title} />
                            <div className="categories-card-text">
                                <h4>{category.title}</h4>
                                <p>{category.description}</p>
                            </div>
                        </div>

                    )) :
                    <div>
                        <h4>Aún no hay categorías cargadas</h4>
                    </div>

                }

            </div>
        </div>
    );
};

export default Categories;