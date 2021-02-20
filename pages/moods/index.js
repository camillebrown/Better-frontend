import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mood from '../../components/Mood';
import { Button } from '@chakra-ui/react'
import Router from 'next/router'

const moods = () => {

    const [moods, setMoods] = useState([])
    const [ratings, setRatings] = useState([])

    const getMoods = () => {
        // FIGURE OUT WHY PROCESS.ENV IS NOT WORKING!!!!!!
        axios.get(`http://localhost:8000/moods/`,
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

    return (
        <div>
            <div className="img-mood">
            </div>
            {moods[0] == null ? (
                <div className="loading">
                    <p>You don't have any mood logs added yet. Let's get one added!</p>
                    <Button onClick={addMood}>Add a New Mood</Button>
                </div>
            ) : (
                    <Mood moods={moods} ratings={ratings} />
                )}
        </div>

    )
}

export default moods