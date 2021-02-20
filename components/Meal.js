import React from 'react';
import { Box, Text, Button, Wrap, WrapItem, Center, GridItem, Grid, Divider } from '@chakra-ui/react'
import axios from 'axios'
import Router from 'next/router'
var dayjs = require('dayjs')
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)


function Meal(props) {

    const meals = props.meals.map((meal) => {
        let date = dayjs(meal.created_at).format('LL')

        const deleteMeal = () => {
            axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meals/${meal.id}`)
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
            <WrapItem key={meal.id} >
                <Box className="divs" key={meal.id}>
                    <Box className="div-title">
                        <Text color="black" fontSize="28px" textAlign="center">
                            {meal.meal_name}
                        </Text>
                        <hr className="rounded" />
                    </Box>
                    <Grid className="meal-container" >
                        <GridItem className="m1" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder">
                                <span className="logo">
                                    {meal.protein}<span className="logo-dot">g</span> </span> <br />Protein
                                                </Text>
                        </GridItem>
                        <GridItem className="m2" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder">
                                <span className="logo">
                                    {meal.carbs}<span className="logo-dot">g</span> </span> <br />Carbs
                                                </Text>
                        </GridItem>
                        <GridItem className="m3" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder">
                                <span className="logo">
                                    {meal.fat}<span className="logo-dot">g</span> </span> <br />Fat
                                                </Text>
                        </GridItem>
                        <GridItem className="m5">
                            <Center>
                                <Text
                                    fontSize="medium"
                                    fontFamily="Boing" fontWeight="medium"
                                    textAlign="center"
                                    width="90%"
                                >Total Calories: {meal.total_calories} <br /> Date: {date}
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem className="m4">
                            <Center>
                                <Divider />
                            </Center>
                        </GridItem>
                    </Grid>
                    <Button mx={2} onClick={deleteMeal}>Delete Meal</Button>
                    <Button mx={2} onClick={editMeal}>Update Meal</Button>
                </Box>
            </WrapItem >
        )
    })

    return (
        <Box className="div-box">
            <Wrap justify="center">
                {meals}
            </Wrap>
        </Box>
    )
}

export default Meal