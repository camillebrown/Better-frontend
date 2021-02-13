import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react'
import axios from 'axios'

function Fitness(props) {
    const workouts = props.workouts.map((workout) => {
        const deleteWorkout = () => {
            console.log(workout.id)
            axios.delete(`http://localhost:8000/workouts/${workout.id}`)
                .then((data) => {
                    console.log(data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const editWorkoutLog = () => {
            console.log(workout.id)
            axios.put(`http://localhost:8000/workouts/${workout.id}`)
                .then((data) => {
                    console.log(data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
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
                <Button onClick={editWorkoutLog}>Update Workout Log</Button>
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