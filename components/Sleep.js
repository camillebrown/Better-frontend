import React, { useState } from 'react';
import { Box, Text, Button, Wrap, WrapItem, Center, GridItem, Grid, Divider } from '@chakra-ui/react'
import axios from 'axios'
import Router from 'next/router'
var dayjs = require('dayjs')
var localizedFormat = require('dayjs/plugin/localizedFormat')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)


function Sleep(props) {

    const [sleepTime, setSleepTime] = useState("")

    const sleeps = props.sleeps.map((sleep) => {

        let headerDate = dayjs(sleep.date).format('LL')
        const hr1 = sleep.start_time.substring(0, 2)
        const hr2 = sleep.end_time.substring(0, 2)
        let hours = hr2 - hr1
        let sleepTime = hours + 24
        if (sleepTime>24){
            sleepTime = sleepTime-24
        }
        let start =  sleep.start_time.substring(0, 5)
        let end =  sleep.end_time.substring(0, 5)

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
            <WrapItem >
                <Box className="divs" key={sleep.id}>
                    <Box className="div-title">
                        <Text color="black" fontSize="28px" textAlign="center">
                            {headerDate}
                        </Text>
                        <hr class="sleep-rounded" />
                    </Box>
                    <Grid className="meal-container" >
                        <GridItem className="m1" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder">
                                <span className="fit-logo" >
                                    {start} </span> <br />PM
                                        </Text>
                        </GridItem>
                        <GridItem className="m2" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder">
                                <span className="fit-logo" >
                                    {end} </span> <br />AM
                                        </Text>
                        </GridItem>
                        <GridItem className="m3" textAlign="center">
                            <Text fontFamily="Boing" fontWeight="bolder" >
                                <span className="fit-logo" >
                                    {sleepTime} </span> <br />hrs
                                        </Text>
                        </GridItem>
                        <GridItem className="m4">
                            <Center>
                                <Divider />
                            </Center>
                        </GridItem>
                    </Grid>
                    <Button mx={2} onClick={deleteSleep}>Delete Sleep</Button>
                    <Button mx={2}  onClick={editSleepLog}>Update Sleep</Button>
                </Box>
            </WrapItem >

        )
    })

    return (
        <Box className="div-box">
            <Wrap justify="center">
                {sleeps}
            </Wrap>
        </Box>
    )
}

export default Sleep