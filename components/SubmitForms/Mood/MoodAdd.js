import React, { useState } from 'react'
import Router from "next/router";
import { Stack, Input, FormControl, InputGroup, Button, FormHelperText, Select } from '@chakra-ui/react'
import axios from 'axios'

const MoodAdd = (props) => {
    const [data, setData] = useState(
        {
            date: "",
            rating: ""
        }
    )

    const handleAdd = (e) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/moods/`, {
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
        <form action="submit" onSubmit={handleAdd}>
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
                    </Select>
                </FormControl>
                <Button
                    onSubmit={handleAdd}
                    type="submit"
                    variant="solid"
                    variantcolor="red"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg" }}
                >
                    Save Mood
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    Log your mood to <br></br>keep track of your daily temperament 😊
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default MoodAdd