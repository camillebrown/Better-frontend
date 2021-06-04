import axios from "axios";
// https://get-better-app.herokuapp.com/

let API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// SIGN UP
export const register = (firstName, lastName, username, email, password) => {
  return axios.post(API_URL + '/api/v1/users/register', {
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
  return axios.post(API_URL + '/api/v1/users/login', {
    email, password
  },
    { withCredentials: true }
  )
}
// LOG OUT
export const logout = () => {
  console.log('Are we hitting this even without the click???')
  axios.get(API_URL + '/api/v1/users/logout', { withCredentials: true })
  setTimeout(() => {
    window.location.replace("/")
  }, 500);
}

axios.get(
  process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/users/logout`, { withCredentials: true })
