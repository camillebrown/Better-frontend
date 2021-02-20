import React from 'react';
import { Box, Text, Button, Wrap, WrapItem, Center, GridItem, Grid, Divider } from '@chakra-ui/react'
import axios from 'axios'
import Router from 'next/router'
var dayjs = require('dayjs')
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)


function Fitness(props) {

    const workouts = props.workouts.map((workout) => {
        let date = dayjs(workout.created_at).format('LL')
        const deleteWorkout = () => {
            axios.delete(`http://localhost:8000/workouts/${workout.id}`,
                { withCredentials: true })
                .then((data) => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const editWorkout = () => {
            console.log(workout.id)
            Router.push({
                pathname: '/workouts/add',
                query: { workout: workout.id },
            })
        }


        return (
            <WrapItem >
                <Box className="work-divs" key={workout.id}>
                    <Box className="fit-title">
                        <Text color="black" fontSize="28px" textAlign="center">
                            {workout.exercise_name}
                        </Text>
                        <hr class="rounded" />
                    </Box>
                    <Grid className="meal-container" >
                        <GridItem className="m1" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder">
                                <span className="fit-logo" >
                                    {workout.calories} </span> <br />Calories
                                            </Text>
                        </GridItem>
                        <GridItem className="m2" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder">
                                <span className="fit-logo" >
                                    {workout.repetitions} </span> <br />Reps
                                            </Text>
                        </GridItem>
                        <GridItem className="m3" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder" >
                                <span className="fit-logo" >
                                    {workout.sets} </span> <br />Sets
                                            </Text>
                        </GridItem>
                        <GridItem className="m5">
                            <Center>
                                <Text
                                    fontSize="medium"
                                    fontFamily="Boing" fontWeight="medium"
                                    textAlign="center"
                                    width="90%"
                                >Total Time: {workout.time_duration} <br /> Date: {date}
                                </Text>
                            </Center>
                        </GridItem>
                        <GridItem className="m4">
                            <Center>
                                <Divider />
                            </Center>
                        </GridItem>
                    </Grid>
                    <Button mx={1} onClick={deleteWorkout}>Delete Workout</Button>
                    <Button mx={1} onClick={editWorkout}>Update Workout</Button>
                </Box>
            </WrapItem >

        )
    })

    return (
        <Box className="div-box">
            <Wrap justify="center">
                {workouts}
            </Wrap>
        </Box>
    )
}

export default Fitness