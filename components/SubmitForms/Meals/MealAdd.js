import React, { useState } from 'react'
import Router from "next/router";
import { Stack, Input, FormControl, InputGroup, Button, FormHelperText, InputRightAddon } from '@chakra-ui/react'
import axios from 'axios'

const MealAdd = (props) => {
    const user = props.user
    const [data, setData] = useState(
        {
            meal_name: "",
            protein: "",
            carbs: "",
            fat: "",
            total_calories: ""
        }
    )

    const handleAdd = (e) => {
        e.preventDefault()
        console.log(data)
        axios.post(`http://localhost:8000/meals/`, {
            person_id: user.id,
            meal_name: data.meal_name,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            total_calories: data.total_calories
        }, {
            headers:
                { withCredentials: true, crossorigin: true }
        }
        )
            .then((res) => {
                console.log('SENT REQUEST TO BACKEND')
                console.log('DATA', res.data)
                Router.push("/meals")
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
                            placeholder="Meal Name"
                            name="meal_name"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Protein"
                            name="protein"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="g" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Carbohydrates"
                            name="carbs"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="g" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Fat"
                            name="fat"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="g" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Total Calories"
                            name="total_calories"
                            onChange={handleChange}
                        />
                        <InputRightAddon children="calories" />
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
                    Save Meal
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    Log your meal to <br></br>track your macros 🥘
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default MealAdd