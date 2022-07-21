import Api from "./api";

const cityService = {};

cityService.getCities = () => {
    return Api.get("/cities/")
    .then(res => res.data)
    .catch(err => {throw err})
}

cityService.postCities = (data) => {
    return Api.post("/cities/", data)
    .then(res => res.data)
    .catch(err => {throw err})
}

cityService.getCitiesById = (id) => {
    return Api.get(`/cities/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

cityService.updateCitiesById = (id) => {
    return Api.put(`/cities/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

cityService.deleteCitiesById = (id) => {
    return Api.delete(`/cities/${id}`)
    .then(res => res.data)
    .catch(err => {throw err})
}

export default cityService;