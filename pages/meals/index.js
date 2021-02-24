import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meal from '../../components/Meal'
import { Button } from '@chakra-ui/react'
import Router from 'next/router'
import { IoMdArrowRoundBack } from "react-icons/io";


const meals = () => {

    const [meals, setMeals] = useState([])

    const getMeals = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meals/`,
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
    const back = () => {
        Router.push({
            pathname: '/profile'
        })
    }

    return (
        <div>
            <div className="img-meal">
            </div>
            <Button onClick={addMeal}>Add More Meals</Button>
            <Button onClick={back} mx={4}><IoMdArrowRoundBack px={4} />Go Back</Button>
            {meals[0] == null ? (
                <div className="loading">
                    <p>You don't have any meals added yet. Let's get one added!</p>
                </div>
            ) : (
                    <Meal meals={meals} />
                )}
        </div>

    )
}

export default meals