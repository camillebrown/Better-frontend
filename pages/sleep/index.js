import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sleep from '../../components/Sleep'
import { Button } from '@chakra-ui/react'
import Router from 'next/router'

const sleep = () => {

    const [sleeps, setSleeps] = useState([])

    const getSleeps = () => {
        axios.get(`http://localhost:8000/sleeps/`,
            { withCredentials: true })
            .then((res) => {
                setSleeps(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getSleeps()
    }, [])

    const addSleep = () => {
        Router.push({
            pathname: '/sleep/add'
        })
    }

    return (
        <div>
            <img src="https://i.ibb.co/VwXGsn8/SLEEP-1.png" alt="SLEEP-1" border="0" />
            {sleeps[0] == null ? (
                <div>
                    <p>You don't have any sleep logs yet. Let's get some added!</p>
                    <Button onClick={addSleep}>Add a Sleep Log </Button>
                </div>
            ) : (
                    <Sleep sleeps={sleeps} />
                )}
        </div>
    )
}

export default sleep