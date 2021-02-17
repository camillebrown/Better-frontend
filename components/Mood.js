import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react'
import axios from 'axios'
import Router from 'next/router'


function Mood(props) {

    const moods = props.moods.map((mood) => {

        const deleteMood = () => {

            axios.delete(`http://localhost:8000/moods/${mood.id}`)
                .then((data) => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const editMood = () => {
            Router.push({
                pathname: '/moods/add',
                query: { mood: mood.id },
            })
        }

        return (
            <Box key={mood.id}>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {mood.date}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {mood.rating}
                </Text>
                <Button onClick={deleteMood}>Delete Mood</Button>
                <Button onClick={editMood}>Update Mood</Button>
            </Box>
        )
    })

    return (
        <Box>
            {moods}
        </Box>
    )
}

export default Mood