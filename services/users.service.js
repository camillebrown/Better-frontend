import axios from "axios";
const API_URL = 'http://localhost:8000/api/v1/users'

// SIGN UP
export const register = (firstName, lastName, username, email, password) => {
    return axios.post(API_URL + '/register', {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password
    },
        { withCredentials: true }
    )
}
// LOG IN
export const login = (email, password) => {
    return axios.post(API_URL + '/login', {
        email, password
    },
        { withCredentials: true }
    )
}
// LOG OUT
export const logout = () => {
    return axios.get(API_URL + '/logout', { withCredentials: true })
}