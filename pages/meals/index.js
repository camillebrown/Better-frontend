import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meal from '../../components/Meal'
import { Button } from '@chakra-ui/react'
import Router from 'next/router'

const meals = () => {

    const [meals, setMeals] = useState([])

    const getMeals = () => {
        axios.get(`http://localhost:8000/meals/`,
            { withCredentials: true }
        )
            .then((res) => {
                setMeals(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getMeals()
    }, [])

    const addMeal = () => {
        Router.push({
            pathname: '/meals/add'
        })
    }

    return (
        <div>
            {meals[0] == null ? (
                <div>
                    <p>You don't have any meals added yet. Let's get one added!</p>
                    <Button onClick={addMeal}>Add a New Meal</Button>
                </div>
            ) : (
                    <Meal meals={meals} />
                )}
        </div>

    )
}

export default meals