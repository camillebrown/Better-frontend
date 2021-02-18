import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react'
import axios from 'axios'
import Router from 'next/router'


function Sleep(props) {

    const sleeps = props.sleeps.map((sleep) => {

        const deleteSleep = () => {

            axios.delete(`http://localhost:8000/sleeps/${sleep.id}`,
                { withCredentials: true })
                .then((data) => {
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const editSleepLog = () => {
            Router.push({
                pathname: '/sleep/add',
                query: { sleep: sleep.id },
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