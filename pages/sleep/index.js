import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sleep from '../../components/Sleep'
import { Button } from '@chakra-ui/react'
import Router from 'next/router'
import { IoMdArrowRoundBack } from "react-icons/io";

const sleep = () => {

    const [sleeps, setSleeps] = useState([])

    const getSleeps = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sleeps/`,
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
    const back = () => {
        Router.push({
            pathname: '/profile'
        })
    }

    return (
        <div>
            <div className="img-sleep">
            </div>
            <Button onClick={addSleep}>Add Sleep Log</Button>
            <Button onClick={back} mx={4}><IoMdArrowRoundBack px={4}/>Go Back</Button>
            {sleeps.length === 0 ? (
                <div>
                    <p>You don't have any sleep logs yet. Let's get some added!</p>
                </div>
            ) : (
                    <Sleep sleeps={sleeps} />
                )}
        </div>
    )
}

export default sleep