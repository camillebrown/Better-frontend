import React, { useState, useEffect } from 'react';
import Router from "next/router";
import { Stack, Input, FormControl, InputGroup, Button, FormHelperText, Select } from '@chakra-ui/react'
import axios from 'axios'


const MoodUpdate = (props) => {

    useEffect(() => {
        getMoodData()
    }, [])

    const mood_id = props.mood
    const [mood, setMood] = useState([])
    const [data, setData] = useState(
        {
            date: "",
            rating: ""
        }
    )

    const getMoodData = () => {

        axios.get(`http://localhost:8000/moods/${mood_id}`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data.data)
                setMood(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    

    const handleEdit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/moods/${mood_id}`, {
            date: data.date,
            rating: data.rating
        }, {
             withCredentials: true
        }
        )
            .then((res) => {
                Router.push("/moods")
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
            <h1>You're editing data for this mood:</h1>
            <p>Date: {mood.date}</p>
            <p>Rating: {mood.rating}</p>

            <form action="submit" onSubmit={handleEdit}>
                <Stack spacing={4}>

                <FormControl >
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
                    <Select
                        placeholder="Select a Mood Rating"
                        name="rating"
                        onChange={handleChange}>
                        <option value="0">Wow, today sucks!</option>
                        <option value="1">Not good, but I guess it could be worse.</option>
                        <option value="2">Ya know, I'm alright today.</option>
                        <option value="3">Today's been kinda great.</option>
                        <option value="4">This was the most amazing day!</option>
                        )
                    </Select>
                </FormControl>

                    <Button
                        type="submit"
                        variant="solid"
                        variantcolor="red"
                        boxShadow="sm"
                        _hover={{ boxShadow: "lg" }}
                    >
                        Update Mood
                </Button>

                    <FormHelperText textAlign="center">
                        {/* Control + Command + Space allows you to get emojis!! */}
                        Update your mood to <br></br>correct your daily temperament 😊
                </FormHelperText>

                </Stack>
            </form>
        </>
    )
}

export default MoodUpdate