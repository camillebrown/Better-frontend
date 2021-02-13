import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mood from '../components/Mood';

const moods = () => {

    const [moods, setMoods] = useState([])

    const getMoods = () => {
        axios(process.env.REACT_APP_FLASK_API_URL + '/moods')
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
    },[])

    return (
        <h1>Testing</h1>
        // <Mood moods={moods} />
    )
}

export default moods