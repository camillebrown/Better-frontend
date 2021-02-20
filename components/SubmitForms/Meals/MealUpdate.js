import React, { useState, useEffect } from 'react';
import Router from "next/router";
import { Stack, Input, FormControl, InputGroup, Button, FormHelperText, InputRightAddon } from '@chakra-ui/react'
import axios from 'axios'


const MealUpdate = (props) => {

    useEffect(() => {
        getMealData()
    }, [])

    const meal_id = props.meal
    
    const [meal, setMeal] = useState([])

    const getMealData = () => {
        
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/meals/${meal_id}`,
            { withCredentials: true }
        )
            .then((res) => {
                setMeal(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }



    const [data, setData] = useState(
        {
            meal_name: "",
            protein: "",
            carbs: "",
            fat: "",
            total_calories: ""
        }
    )

    const handleEdit = (e) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/meals/${meal_id}`, {
            meal_name: data.meal_name,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            total_calories: data.total_calories
        }, {
            withCredentials: true
        }
        )
            .then((res) => {
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
        <>
            <h1>You're editing data for this meal: Name: {meal.meal_name}</h1>
            <p>Protein: {meal.protein}</p>
            <p>Carbs: {meal.carbs}</p>
            <p>Fat: {meal.fat}</p>
            <p>Total Calories: {meal.total_calories}</p>

            <form action="submit" onSubmit={handleEdit}>
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
                        type="submit"
                        variant="solid"
                        variantcolor="red"
                        boxShadow="sm"
                        _hover={{ boxShadow: "lg" }}
                    >
                        Update Meal
                </Button>

                    <FormHelperText textAlign="center">
                        {/* Control + Command + Space allows you to get emojis!! */}
                    Update your meal to <br></br>correct your macros 🥘
                </FormHelperText>

                </Stack>
            </form>
        </>
    )
}

export default MealUpdate