import { Base64 } from "../utils/base64"

export const getSession = () => {
    const token = localStorage.getItem('token')

    if (token) {
        const userData = Base64.atob(token.split('.')[1])
        const data = JSON.parse(userData)
        return {
            isLogged: true,
            data
        }
    } else {
        return {
            isLogged: false
        }
    }
}