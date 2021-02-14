import React, { useState, useEffect } from 'react';
import axios from 'axios';

const profile = () => {

    const [user, setUser] = useState([])

    const getUserInfo = () => {
        axios.get(`http://localhost:8000/profile/`,
            { withCredentials: true }
        )
            .then((res) => {
                setUser(res.data.data)
            })
    .catch(err => {
        console.log(err)
    })
    }

useEffect(() => {
    getUserInfo()
}, [])

return (
    <div>
        <h1>{user.first_name} </h1>
        <h1>{user.last_name} </h1>
        <h1>{user.email} </h1>
        <h1>{user.id} </h1>
    </div>
)
}

export default profile