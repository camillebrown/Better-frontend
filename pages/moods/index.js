import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mood from '../../components/Mood';
import { Button } from '@chakra-ui/react'
import Router from 'next/router'
import { IoMdArrowRoundBack } from "react-icons/io";

const moods = () => {

    const [moods, setMoods] = useState([])
    const [ratings, setRatings] = useState([])

    const getMoods = () => {
        // FIGURE OUT WHY PROCESS.ENV IS NOT WORKING!!!!!!
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/moods/`,
            { withCredentials: true }
        )
            .then((res) => {
                setMoods(res.data.data)
                setRatings(res.data.ratings)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getMoods()
    }, [])

    const addMood = () => {
        Router.push({
            pathname: '/moods/add'
        })
    }
    const back = () => {
        Router.push({
            pathname: '/profile'
        })
    }

    return (
        <div>
            <div className="img-mood">
            </div>
            <Button onClick={addMood}>Add Mood Log</Button>
            <Button onClick={back} mx={4}><IoMdArrowRoundBack px={4} />Go Back</Button>
            {moods.length === 0  ? (
                <div className="loading">
                    <p>You don't have any mood logs added yet. Let's get one added!</p>
                </div>
            ) : (
                    <Mood moods={moods} ratings={ratings} />
                )}
        </div>

    )
}

export default moods