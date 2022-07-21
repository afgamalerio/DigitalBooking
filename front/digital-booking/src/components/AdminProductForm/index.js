import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import productService from '../../services/products';
import Button from '../Button';
import './AdminProductForm.scss';
import categoryService from '../../services/categories';
import cityService from '../../services/cities';
import Select from 'react-select';
import S3 from "react-aws-s3";
import imageService from '../../services/images';
import Swal from 'sweetalert2';
import { isInteger } from 'formik';

const AdminProductForm = () => {
    const history = useHistory()

    const [successData, setSuccessData] = useState([]);

    const [categoriesData, setCategoriesData] = useState([]);
    const [citiesData, setCitiesData] = useState([]);
    const [featuresData, setFeaturesData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [nameValue, setNameValue] = useState("");
    const [adressValue, setAdressValue] = useState("");
    const [titleDescriptionValue, setTitleDescriptionValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [cityValue, setCityValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [featuresValue, setFeaturesValue] = useState([]);
    const [houserulesValue, setHouserulesValue] = useState("");
    const [healthValue, setHealthValue] = useState("");
    const [cancellationValue, setCancellationValue] = useState("");
    const [imageValue, setImageValue] = useState([]);
    const [latValue, setLatValue] = useState(null);
    const [longValue, setLongValue] = useState(null);

    const featuresOptions = []

    const fileInput = useRef();

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

    useEffect(() => {
        const getInfoData = async () => {
            try {
                const resCities = await cityService.getCities();

                setCitiesData(resCities);

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

    useEffect(() => {
        const getInfoData = async () => {
            try {
                const resFeatures = await productService.getFeatures();
                setFeaturesData(resFeatures)

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

    featuresData.map((feature, index) => (
        featuresOptions.push({
            value: feature.id,
            label: feature.name
        })
    ))

    const handleChange = (selectedOptions) => {
        let featuresArray = []
        selectedOptions.map((option, index) => {
            featuresArray.push(
                {
                    id: option.value
                })
        })
        setFeaturesValue(featuresArray)
    }

    const product = {
        name: nameValue,
        title_description: titleDescriptionValue,
        description: descriptionValue,
        rating: 4,
        latitude: parseFloat(latValue),
        longitude: parseFloat(longValue),
        category: {
            id: categoryValue
        },
        city: {
            id: cityValue
        },
        features: featuresValue,
        images: imageValue,
        policies: {
            rules: houserulesValue,
            security: healthValue,
            cancellation: cancellationValue
        }
    }

    const postProduct = async (event) => {
        event.preventDefault();

        console.log("post product", product)

        try {
            setLoading(true)
            const data = await productService.postProducts(product);

            console.log("datos de la creación: ", data.data)

            if (data.status === 201) {
                console.log("success create product")
                history.push({ pathname: `/administration/success`, successData: `El producto se ha creado con éxito` })
            }

        } catch (error) {
            console.log(error)
            Swal.fire({
                text: "No se pudo crear el producto, por favor intenta nuevamente más tarde",
                confirmButtonColor: "#FBC02D",
            })
        } finally {
            setLoading(false)
        }

    }

    const addImage = (event) => {
        event.preventDefault();
        let file = fileInput.current.files[0];
        let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
        console.log("newFileName", newFileName)
        const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            dirName: process.env.REACT_APP_DIR_NAME /* optional */,
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
            s3Url: 'https://pig1bucket.s3.amazonaws.com'
        };

        const ReactS3Client = new S3(config);

        ReactS3Client.uploadFile(file, newFileName).then((data) => {
            console.log(data);

            if (data.status === 204) {
                console.log("success");
                console.log("url", data.location)
                uploadImageToDB(data.location, data.key);
            } else {
                console.log("fail");
            }
        });

    }

    const uploadImageToDB = async (url, title) => {
        try {
            const resImage = await imageService.postImages({
                title: title,
                url: url
            });

            if (resImage.status === 201) {
                console.log(resImage)
                console.log(resImage.data.id)
                console.log(resImage.data.url)
                setImageValue(prev => [...prev, {
                    id: resImage.data.id,
                    url: resImage.data.url
                }])
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (

        <>

            <form className="admin-form" >
                <div className="admin-wrapper">
                    <div className="admin-form-group">
                        <label htmlFor="name">Nombre de la propiedad</label>
                        <input
                            onChange={({ target: { value } }) => setNameValue(value)}
                            className="admin-input"
                            id="name"
                            name="name"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="category">Categoría</label>
                        <select className="admin-input"
                            onChange={({ target: { value } }) => setCategoryValue(value)}
                            required>
                            <option value="" selected disabled hidden>Seleccione una categoria para su alojamiento</option>
                            {categoriesData.length ?
                                categoriesData.map((category, index) => (
                                    <option value={category.id}>{category.title}</option>
                                )) :
                                <option>No hay categorias disponibles</option>

                            }
                        </select>
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="address">Dirección</label>
                        <input
                            onChange={({ target: { value } }) => setAdressValue(value)}
                            className="admin-input"
                            id="address"
                            name="address"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="city">Ciudad</label>
                        <select className="admin-input"
                            required
                            onChange={({ target: { value } }) => setCityValue(value)}>
                            <option value="" selected disabled hidden>Seleccione una ciudad</option>
                            {citiesData.length ?
                                citiesData.map((city, index) => (
                                    <option value={city.id}>{city.name + ", " + city.country_name}</option>
                                )) :
                                <option>No hay ciudades disponibles</option>
                            }
                        </select>
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="address">Latitud</label>
                        <input
                            onChange={({ target: { value } }) => setLatValue(value)}
                            className="admin-input"
                            id="lat"
                            name="lat"
                            type="number"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="address">Longitud</label>
                        <input
                            onChange={({ target: { value } }) => setLongValue(value)}
                            className="admin-input"
                            id="long"
                            name="long"
                            type="number"
                            required
                        />
                    </div>

                    <div className="descrip-form-group">
                        <label htmlFor="description">Título</label>
                        <input
                            id="title_description"
                            name="title_description"
                            className="admin-input"
                            required
                            onChange={({ target: { value } }) => setTitleDescriptionValue(value)}
                        ></input>
                    </div>

                    <div className="descrip-form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            className="admin-input"
                            required
                            rows="4"
                            maxLength="250"
                            onChange={({ target: { value } }) => setDescriptionValue(value)}
                        ></textarea>
                    </div>
                </div>

                <div className="attribute-form-container">
                    <h3>Agregar atributos</h3>
                    <div className="attribute-form">
                        <Select
                            isMulti
                            placeholder="Seleccione atributos..."
                            name="colors"
                            options={featuresOptions}
                            className="attribute-input"
                            classNamePrefix="attribute-input"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="policy-form">
                    <h3>Políticas del producto</h3>
                    <div className="admin-card-container">
                        <div className="admin-card">
                            <h4>Normas de la casa</h4>
                            <p>Descripción</p>
                            <textarea
                                className="admin-input"
                                required
                                onChange={({ target: { value } }) => setHouserulesValue(value)}
                            ></textarea>
                        </div>
                        <div className="admin-card">
                            <h4>Salud y Seguridad</h4>
                            <p>Descripción</p>
                            <textarea
                                className="admin-input"
                                required
                                onChange={({ target: { value } }) => setHealthValue(value)}
                            ></textarea>
                        </div>
                        <div className="admin-card">
                            <h4>Política de cancelación</h4>
                            <p>Descripción</p>
                            <textarea
                                className="admin-input"
                                required
                                onChange={({ target: { value } }) => setCancellationValue(value)}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="image-form">
                    <h3>Cargar imágenes</h3>
                    <div className="image-url">
                        <input
                            className="admin-input"
                            id="image-url"
                            name="image-url"
                            type='file'
                            ref={fileInput}
                            required
                            accept="image/png, image/jpeg"
                        />
                        <Button variant="button-full" className="img-button" onClick={(event) => addImage(event)}>+</Button>
                    </div>
                    <div className="image-upload-container">
                        {imageValue.length >= 1 ?
                            imageValue.map((image, index) => (
                                <img className="image-upload" key={index} src={image.url} />
                            ))
                            : <p>No hay imágenes cargadas</p>}
                    </div>
                </div>                
                {loading ? <p>Creando producto, por favor aguarde... </p> : null}
                <Button
                    onClick={!loading ? (event) => postProduct(event) : null}
                    className="admin-button"
                    variant="button-full">
                    Crear Producto
                </Button>
            </form >


        </>
    );
};

export default AdminProductForm;