import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react'
import axios from 'axios'

function MoodList(props) {
    const moods = props.moods.map((mood) => {
        // console.log(mood.id)
        const deleteMood = () => {
            console.log(mood.id)
            axios.delete(process.env.REACT_APP_FLASK_API_URL + `/moods/${mood.id}`)
                .then((data) => {
                    console.log(data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const editMood = () => {
            console.log(mood.id)
            axios.updateMood(process.env.REACT_APP_FLASK_API_URL + `/moods/${mood.id}`)
                .then((data) => {
                    console.log(data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
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
                <Button onClick={editMood}>Edit Mood</Button>
            </Box>
        )
    })

    return (
        <Box>
            {moods}
        </Box>
    )
}

export default MoodList