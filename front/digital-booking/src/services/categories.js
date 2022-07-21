import Api from "./api";

const categoryService = {};

categoryService.getCategories = () => {
    return Api.get("/categories/")
    .then(res => res.data)
    .catch(err => {throw err})
}

categoryService.postCategories = (data) => {
    return Api.post("/categories/", data)
    .then(res => res.data)
    .catch(err => {throw err})
}

categoryService.getCategoriesById = (id) => {
    return Api.get(`/categories/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

categoryService.updateCategoriesById = (id) => {
    return Api.put(`/categories/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

categoryService.deleteCategoriesById = (id) => {
    return Api.delete(`/categories/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

export default categoryService;