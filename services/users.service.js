import axios from "axios";
// https://get-better-app.herokuapp.com/

// SIGN UP
export const register = (firstName, lastName, username, email, password) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/v1/users/register', {
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
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/v1/users/login', {
        email, password
    },
        { withCredentials: true }
    )
}
// LOG OUT
export const logout = () => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/v1/users/logout', { withCredentials: true })
}
