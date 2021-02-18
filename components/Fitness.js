import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react'
import axios from 'axios'
import Router from 'next/router'


function Fitness(props) {
    
    const workouts = props.workouts.map((workout) => {
        const deleteWorkout = () => {
            axios.delete(`http://localhost:8000/workouts/${workout.id}`,
            {withCredentials:true})
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
            <Box key={workout.id}>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {workout.exercise_name}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {workout.calories}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {workout.time_duration}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {workout.repetitions}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {workout.sets}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {workout.weight}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {workout.created_at}
                </Text>
                <Button onClick={deleteWorkout}>Delete Workout</Button>
                <Button onClick={editWorkout}>Update Workout</Button>
            </Box>
        )
    })

    return (
        <Box>
            {workouts}
        </Box>
    )
}

export default Fitness