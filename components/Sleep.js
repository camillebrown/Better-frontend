import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react'
import axios from 'axios'

function Sleep(props) {
    const sleeps = props.sleeps.map((sleep) => {
        // console.log(sleep.id)
        const deleteSleep = () => {
            console.log(sleep.id)
            axios.delete(`http://localhost:8000/sleeps/${sleep.id}`)
                .then((data) => {
                    console.log(data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const editSleepLog = () => {
            console.log(sleep.id)
            axios.put(`http://localhost:8000/sleeps/${sleep.id}`)
                .then((data) => {
                    console.log(data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }


        return (
            <Box key={sleep.id}>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {sleep.date}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {sleep.start_time}
                </Text>
                <Text color="black" fontSize="16px" fontWeight="light">
                    {sleep.end_time}
                </Text>
                <Button onClick={deleteSleep}>Delete Sleep Log</Button>
                <Button onClick={editSleepLog}>Update Sleep Log</Button>
            </Box>
        )
    })

    return (
        <Box>
            {sleeps}
        </Box>
    )
}

export default Sleep