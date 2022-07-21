import Api from "./api";

const imageService = {};

imageService.postImages = (data) => {
    return Api.post("/images/", data)
    .then(res => res)
    .catch(err => {throw err})
}


export default imageService;