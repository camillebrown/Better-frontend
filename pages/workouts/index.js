import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fitness from '../../components/Fitness'
import { Button } from '@chakra-ui/react'
import Router from 'next/router'
import { IoMdArrowRoundBack } from "react-icons/io";

const workouts = () => {

    const [workouts, setWorkouts] = useState([])

    const getWorkouts = () => {
        axios.get(`http://localhost:8000/workouts/`,
            { withCredentials: true }
        )
            .then((res) => {
                setWorkouts(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getWorkouts()
    }, [])

    const addWorkout = () => {
        Router.push({
            pathname: '/workouts/add'
        })
    }
    const back = () => {
        Router.push({
            pathname: '/profile'
        })
    }

    return (
        <div>
            <div className="img-fit">
            </div>
            <Button onClick={addWorkout}>Add Workout</Button>
            <Button onClick={back} mx={4}><IoMdArrowRoundBack px={4}/>Go Back</Button>
            {workouts[0] == null ? (
                <div>
                    <p>You don't have any workouts added yet. Let's get one added!</p>
                    <Button onClick={addWorkout}>Add a New Workout</Button>
                </div>
            ) : (
                    <Fitness workouts={workouts} />
                )}
        </div>
    )
}

export default workouts