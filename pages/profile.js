import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@chakra-ui/react"
import Router from "next/router";

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

    const moods = () => {
        Router.push("/moods")
    }
    const sleep = () => {
        Router.push("/sleep")
    }
    const workouts = () => {
        Router.push("/workouts")
    }
    const meals = () => {
        Router.push("/meals")
    }

    return (
        <div>
            <h1>{user.first_name} </h1>
            <h1>{user.last_name} </h1>
            <h1>{user.email} </h1>
            <h1>{user.id} </h1>

            <Button
                size="sm"
                onClick={sleep}
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                    bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
            >
                Sleep Logs
            </Button>

            <Button
                size="sm"
                onClick={meals}
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                    bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
            >
                Meals
            </Button>

            <Button
                size="sm"
                onClick={workouts}
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                    bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
            >
                Workouts
            </Button>

            <Button
                size="sm"
                onClick={moods}
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                    bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
            >
                Moods
            </Button>
        </div>
    )
}

export default profile