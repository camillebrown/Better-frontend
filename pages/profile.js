import React, { useState, useEffect } from 'react';
import axios from 'axios';

const profile = () => {

    const [user, setUser] = useState([])

    const getUserInfo = () => {
        axios.get(`http://localhost:8000/profile/`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res)
                // setUser(res.data.data)
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
        <h1>testing 1 </h1>
    </div>
)
}

export default profile