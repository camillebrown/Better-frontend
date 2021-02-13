import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fitness from '../../components/Fitness'

const workouts = () => {

    const [workouts, setWorkouts] = useState([])

    const getWorkouts = () => {
        axios.get(`http://localhost:8000/workouts`)
            .then((res) => {
                setWorkouts(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getWorkouts()
    },[])

    return (
        <Fitness workouts={workouts} />
    )
}

export default workouts