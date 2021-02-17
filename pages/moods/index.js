import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mood from '../../components/Mood';

const moods = () => {

    const [moods, setMoods] = useState([])

    const getMoods = () => {
        // FIGURE OUT WHY PROCESS.ENV IS NOT WORKING!!!!!!
        axios.get(`http://localhost:8000/moods/`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data.data)
                setMoods(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getMoods()
    }, [])

    return (
        <Mood moods={moods} />
    )
}

export default moods