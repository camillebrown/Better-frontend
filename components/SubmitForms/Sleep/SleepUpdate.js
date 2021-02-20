import React, { useState, useEffect } from 'react';
import Router from "next/router";
import { Stack, Input, FormControl, InputGroup, Button, FormHelperText } from '@chakra-ui/react'
import axios from 'axios'


const SleepUpdate = (props) => {

    useEffect(() => {
        getSleepData()
    }, [])

    const sleep_id = props.sleep
    const [sleep, setSleep] = useState([])

    const getSleepData = () => {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/sleeps/${sleep_id}`,
            { withCredentials: true }
        )
            .then((res) => {
                setSleep(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }



    const [data, setData] = useState(
        {
            date: "",
            start_time: "",
            end_time: ""
        }
    )

    const handleEdit = (e) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/sleeps/${sleep_id}`, {
            date: data.date,
            start_time: data.start_time,
            end_time: data.end_time
        }, {
            withCredentials: true
        }
        )
            .then((res) => {
                Router.push("/sleep")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1>You're editing data for this sleep log: Date: {sleep.date}</h1>
            <p>Start Time: {sleep.start_time}</p>
            <p>End Time: {sleep.end_time}</p>

            <form action="submit" onSubmit={handleEdit}>
                <Stack spacing={4}>

                    <FormControl isRequired>
                        <InputGroup>
                            <Input
                                type="date"
                                placeholder="Date"
                                name="date"
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                        <InputGroup>
                            <Input
                                type="time"
                                placeholder="Start Time"
                                name="start_time"
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <InputGroup>
                            <Input
                                type="time"
                                placeholder="End Time"
                                name="end_time"
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="solid"
                        variantcolor="red"
                        boxShadow="sm"
                        _hover={{ boxShadow: "lg" }}
                    >
                        Update Sleep Log
                </Button>

                    <FormHelperText textAlign="center">
                        {/* Control + Command + Space allows you to get emojis!! */}
                        Update your sleep log to <br></br>correct your sleeping habits 😴
                </FormHelperText>

                </Stack>
            </form>
        </>
    )
}

export default SleepUpdate