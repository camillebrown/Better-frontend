import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meal from '../components/Meal'

const meals = () => {

    const [meals, setMeals] = useState([])

    const getMeals = () => {
        axios.get(`http://localhost:8000/meals`)
            .then((res) => {
                setMeals(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getMeals()
    },[])

    return (
        <Meal meals={meals} />
    )
}

export default meals