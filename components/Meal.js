import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react'
import axios from 'axios'
import Router from 'next/router'


function Meal(props) {
    
    const meals = props.meals.map((meal) => {
        const deleteMeal = () => {
            console.log(meal.id)
            axios.delete(`http://localhost:8000/meals/${meal.id}`)
                .then((data) => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const editMeal = () => {
            Router.push({
                pathname: '/meals/add',
                query: { meal: meal.id },
            })
        }


        return (
            <Box key={meal.id}>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {meal.meal_name}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {meal.protein}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {meal.carbs}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {meal.fat}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {meal.total_calories}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {meal.created_at}
                </Text>
                <Button onClick={deleteMeal}>Delete Meal</Button>
                <Button onClick={editMeal}>Update Meal</Button>
            </Box>
        )
    })

    return (
        <Box>
            {meals}
        </Box>
    )
}

export default Meal