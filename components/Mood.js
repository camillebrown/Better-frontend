import React from 'react';
import { Box, Text, Button, Wrap, WrapItem, Center, GridItem, Grid, Divider } from '@chakra-ui/react'
import axios from 'axios'
import Router from 'next/router'
var dayjs = require('dayjs')
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)


function Mood(props) {
    

    const moods = props.moods.map((mood) => {
        console.log(mood)
        let numRating = mood.rating + 1
        let rating = ""
        if (mood.rating === 0) {
            rating = "Wow, today sucks!"
        } else if (mood.rating === 1) {
            rating = "Not good, but I guess it could be worse."
        } else if (mood.rating === 2) {
            rating = "Ya know, I'm alright today."
        } else if (mood.rating === 3) {
            rating = "Today's been kinda great."
        } else if (mood.rating === 4) {
            rating = "This was the most amazing day!"
        }
        let date = (mood.date).substring(0,16)

        const deleteMood = () => {

            axios.delete(`http://localhost:8000/moods/${mood.id}`, {
                withCredentials: true
            })
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

            <WrapItem key={mood.id}>
                <Box className="divs" key={mood.id}>
                    <Box className="div-title">
                        <Text color="black" fontSize="28px" textAlign="center">
                            {date}
                        </Text>
                        <hr className="mood-rounded" />
                    </Box>
                    <Text fontFamily="Boing" fontWeight="bolder">
                        <span className="mood-logo" >
                            {numRating}/5 </span> <br />{rating}
                    </Text>
                    <GridItem className="m4">
                        <Center>
                            <Divider my={4}/>
                        </Center>
                    </GridItem>
                    <Button mx={1} onClick={deleteMood}>Delete Mood</Button>
                    <Button mx={1} onClick={editMood}>Update Mood</Button>
                </Box>
            </WrapItem >
        )
    })

    return (
        <Box className="div-box">
            <Wrap justify="center">
                {moods}
            </Wrap>
        </Box>
    )
}

export default Mood
