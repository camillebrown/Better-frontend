import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sleep from '../components/Sleep'

const sleep = () => {

    const [sleeps, setSleeps] = useState([])

    const getSleeps = () => {
        axios.get(`http://localhost:8000/sleeps`)
            .then((res) => {
                setSleeps(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getSleeps()
    },[])

    return (
        <Sleep sleeps={sleeps} />
    )
}

export default sleep