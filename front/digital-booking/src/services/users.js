import Api from "./api";

const userService = {};

userService.postUser = (data) => {
    return Api.post("/users/", data)
        .then(res => res)
        .catch(err => { throw err })
}

userService.authUser = (data) => {
    return Api.post("/authenticate", data)
        .then(res => res)
        .catch(err => { throw err })
}

userService.postReservation = (data) => {
    const token = localStorage.getItem('token')
    return Api.post("/newreservation/",  data , {
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(res => res)
        .catch(err => { throw err })
}

userService.sendEmail = (data) => {
    return Api.post("/email/send/",  data)
        .then(res => res)
        .catch(err => { throw err })
}

export default userService;