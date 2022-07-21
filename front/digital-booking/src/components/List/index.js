import React, { useEffect, useState } from 'react';
import './List.scss';
import Card from '../Card';
import productsService from '../../services/products';
import Button from '../Button';

const List = ({ setLoading, loading, filter, setFilter, cleanFilter, setCleanFilter }) => {

    const [productsData, setProductsData] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const size = 6;

    useEffect(() => {
        const getInfoData = async () => {
            console.log("filter", filter)

            try {
                setLoading(true)
                let resProducts = []
                let result = await getFilter(filter);
                console.log("result2:", result)

                if (result) {

                    setTotalPages(result.totalPages)
                    setPageNumber(result.pageable.pageNumber)
                    setLastPage(result.last)
                    console.log("result", result)
                    console.log("pageNumber", pageNumber)
                    console.log("totalpages", totalPages)

                    resProducts = result.content;
                    console.log("resProducts:", resProducts)
                }

                if (resProducts) {
                    setProductsData(resProducts)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
                setCleanFilter(false);
            }
        }
        getInfoData()

    }, [filter, pageNumber, cleanFilter])

    const getFilter = async (filter) => {
        let result = null;
        switch (filter.type) {
            case 'category':
                console.log("switch: category")
                result = await productsService.getProductsByCategory(filter.data, pageNumber, size)
                console.log("result:", result)
                return result;
            case 'city':
                console.log("switch: city")
                result = await productsService.getProductsByCity(filter.data.city, pageNumber, size)
                console.log("result:", result)
                return result;
            case 'dates':
                console.log("switch: dates")
                result = await productsService.getProductFiltersByDates(filter.data.dates[0], filter.data.dates[1], pageNumber, size)
                return result;
            case 'cityDates':
                console.log("switch: cityDates")
                filter.data.dates[1] ?
                    result = await productsService.getProductFilters(filter.data.city, filter.data.dates[0], filter.data.dates[1], pageNumber, size)
                    : result = await productsService.getProductFilters(filter.data.city, filter.data.dates[0], filter.data.dates[0], pageNumber, size)
                return result;
            default:
                console.log("switch: default")
                result = await productsService.getRatedProducts(pageNumber, size)
                return result;
        }

    }

    const clean = () => {

        setCleanFilter(true);
        setFilter({
            type: "rated",
            data: 6
        });

    }


    return loading ? <iframe src="https://embed.lottiefiles.com/animation/9619"></iframe> : (
        <div className="list-title-container">
            {productsData ?
                <>
                    <div className="list-title-container-filter">
                        {filter.type === "category" ?
                            <h3 className="list-title">{productsData[0].category.title}</h3>
                            : filter.data.cityName ?
                                <h3 className="list-title">{filter.data.cityName}</h3>
                                :
                                <h3 className="list-title">Recomendaciones</h3>
                        }
                        <Button onClick={() => clean()} variant="button-full" >Limpiar Filtro</Button>
                    </div>
                    <div className="list-container">
                        <div className="list-card-container">
                            {productsData.length ? productsData.map((product, index) => (
                                <Card productData={product} key={index} />
                            )) : <p>No se encontraron productos</p>}
                        </div>
                        <div className="list-pagination">
                            {totalPages ?
                                <ul>
                                    <Button key="1" onClick={() => pageNumber === 0 ? null : setPageNumber(pageNumber - 1)} variant="button-full">Anterior</Button>
                                    <li key="2">{pageNumber + 1}</li>
                                    <li key="3">de</li>
                                    <li key="4">{totalPages}</li>
                                    <Button key="5" onClick={() => pageNumber === totalPages - 1 ? null : setPageNumber(pageNumber + 1)} variant="button-full">Siguiente</Button>
                                </ul>
                                : null}
                        </div>
                    </div>

                </> : null}
        </div>
    );
};


export default List;