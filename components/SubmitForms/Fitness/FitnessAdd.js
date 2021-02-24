import React, { useState } from 'react'
import Router from "next/router";
import { Stack, Input, FormControl, InputGroup, Button, FormHelperText, InputRightAddon } from '@chakra-ui/react'
import axios from 'axios'

const FitnessAdd = (props) => {
    const [data, setData] = useState(
        {
            exercise_name: "",
            calories: "",
            time_duration: "",
            repetitions: "",
            sets: "",
            weight: ""
        }
    )

    const handleAdd = (e) => {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts/`, {
            exercise_name: data.exercise_name,
            calories: data.calories,
            time_duration: data.time_duration,
            repetitions: data.repetitions,
            sets: data.sets,
            weight: data.weight
        }, {
            withCredentials: true
        }
        )
            .then((res) => {
                Router.push("/workouts")
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

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="text"
                            placeholder="Exercise Name"
                            name="exercise_name"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Calories Burned"
                            name="calories"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="calories" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Time Duration (min)"
                            name="time_duration"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="min" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Repetitions"
                            name="repetitions"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="reps" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Number of Sets"
                            name="sets"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="sets" />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Weight"
                            name="weight"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="lbs" />
                    </InputGroup>
                </FormControl>
                <Button
                    onSubmit={handleAdd}
                    type="submit"
                    variant="solid"
                    variantcolor="red"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg" }}
                >
                    Save Workout
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    Log your workout to <br></br>save your fitness activity 💪🏆
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default FitnessAdd