import Api from "./api";

const productService = {};

productService.getProducts = () => {
    return Api.get("/products/")
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.postProducts = (data) => {
    const token = localStorage.getItem('token')
    return Api.post("/products/auth/", data, {
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(res => res)
    .catch(err => {throw err})
}

productService.getProductsById = (id) => {
    return Api.get(`/products/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.updateProductsById = (id) => {
    return Api.put(`/products/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.deleteProductsById = (id) => {
    return Api.delete(`/products/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.getProductsByCategory = (id, page, size) => {
    return Api.get(`/products/categories/${id}?page=${page}&size=${size}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.getProductsByCity = (id, page, size) => {
    return Api.get(`/products/cities/${id}?page=${page}&size=${size}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.getRatedProducts = (page, size) => {
    return Api.get(`/products/rating?page=${page}&size=${size}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.getProductFilters = (city, dateStart, dateFinish, page, size) => {
    return Api.get(`/products/filter/${city}/${dateStart}/${dateFinish}?page=${page}&size=${size}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.getProductFiltersByDates = (dateStart, dateFinish, page, size) => {
    return Api.get(`/products/filterDates/${dateStart}/${dateFinish}?page=${page}&size=${size}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.getProductsPageable = (page, size) => {
    return Api.get(`/products/page/?page=${page}&size=${size}`)
    .then(res => res.data)
    .catch(err => {throw err})

}

productService.getFeatures = () => {
    return Api.get("/features/")
    .then(res => res.data)
    .catch(err => {throw err})
}

productService.getProductsByUserId = (id) => {
    return Api.get(`/reservations/users/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

export default productService;