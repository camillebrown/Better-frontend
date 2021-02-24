import React, { useState, useEffect } from 'react';
import {
    Grid, GridItem, HStack, Table, Thead, Tbody, Tr, Th, Td, Box, Text, StackDivider, Divider, Center
} from "@chakra-ui/react"
import axios from 'axios'
import { ImQuotesLeft } from "react-icons/im";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Doughnut, HorizontalBar, Line } from 'react-chartjs-2';

import Router from "next/router";

const Charts = (props) => {
    console.log(props.moods)
    console.log(props.sleeps)


    useEffect(() => {
        getQuote()
        const getTemp = setTimeout(() => getWeather(), 3000);
        return () => clearTimeout(getTemp);

    }, [])

    const [quote, setQuote] = useState("")
    const [weather, setWeather] = useState()
    const [highFahrenheit, setHighFahrenheit] = useState()
    const [lowFahrenheit, setLowFahrenheit] = useState()
    const getWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${props.settings.zip_code},us&appid=f4a5477638ec2bad03e7ef91172e8f5d`)
            .then((res) => {
                setWeather(res.data)
                let highFahrenheit = Math.round(((res.data.main.temp_max - 273.15) * 9 / 5 + 32) * 10) / 10
                let lowFahrenheit = Math.round(((res.data.main.temp_min - 273.15) * 9 / 5 + 32) * 10) / 10
                setLowFahrenheit(lowFahrenheit)
                setHighFahrenheit(highFahrenheit)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getQuote = () => {
        axios.get('https://zenquotes.io/api/random')
            .then((data) => {
                setQuote(data.data[0])
            })
            .catch(err => {
                console.log(err)
            })
    }

    const moodChart = {
        labels: ['Why?😫', 'Not Good😔', 'Meh🙂', 'Good😄', 'Amazing!🤩'],
        datasets: [
            {
                label: 'Daily Moods',
                legend: {
                    labels: {
                        fontFamily: 'Poppins',
                    }
                },
                backgroundColor: '#ffbe30',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,0,54,0.4)',
                data: props.moods,
            }
        ]
    };

    const donutChart = {
        labels: [
            'Protein',
            'Carbs',
            'Fat'
        ],
        datasets: [{
            data: props.meals,
            backgroundColor: [
                '#f85c4a',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#e27d72',
                '#76cdd8',
                '#FFCE56'
            ]
        }]
    };

    const fitData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Daily Calories',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#1a34c8',
                borderColor: '#1a34c8',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: props.workouts
            }
        ]
    };

    const Sleeps = (props) => {
        console.log(props.sleepData)
        let sleepData = props.sleepData
        for (sleep in props.sleepData) {
            return (
                <Tr>
                    <Td>{sleep.date}</Td>
                    <Td>{sleep.start_time}</Td>
                    <Td>{sleep.end_time}</Td>
                </Tr>
            )
        }
    }

    const seeMoods = () => {
        Router.push("/moods")
    }
    const addMoods = () => {
        Router.push("/moods/add")
    }
    const seeSleep = () => {
        Router.push("/sleep")
    }
    const addSleep = () => {
        Router.push("/sleep/add")
    }
    const seeWorkouts = () => {
        Router.push("/workouts")
    }
    const addWorkouts = () => {
        Router.push("/workouts/add")
    }
    const seeMeals = () => {
        Router.push("/meals")
    }
    const addMeals = () => {
        Router.push("/meals/add")
    }

    return (

        <>
            <div>
                <Center>
                    <Grid className="dash-grid">
                        <GridItem className="dg1">
                            <Box>
                                <Box id="hg2" className="hg-header">
                                    <HStack px={4} py={2}>
                                        <Box>
                                            <AiOutlineInfoCircle
                                                className="info-icon"
                                                onClick={seeWorkouts} />
                                        </Box>
                                        <Box>
                                            <IoAddCircleOutline
                                                className="add-icon"
                                                onClick={seeWorkouts} />
                                        </Box>
                                        <Box px={4}>
                                            <Box >
                                                <h2 className="dash-title">Calories Burned - Fitness Tracking</h2>
                                            </Box>
                                        </Box>
                                    </HStack>
                                </Box>
                                <Box overflow="hidden" backgroundColor="white">
                                    {!props.workouts[0] ? (
                                        <Center>
                                            <Box
                                                height="28vh"
                                                width="30vw">
                                                You don't have any workout data added yet. <br />Click the (+) sign to get started!
                                            </Box>
                                        </Center>
                                    ) : (
                                            <Box>
                                                <Center>
                                                    <Box
                                                        height="28vh"
                                                        width="30vw">
                                                        <Line
                                                            data={fitData}
                                                        />
                                                    </Box>
                                                </Center>
                                                <Center>
                                                    <Text
                                                        fontSize="small"
                                                        fontFamily="Boing" fontWeight="medium"
                                                        textAlign="center"
                                                        width="90%"
                                                    >Looks like you're most active during the middle of the week. <br />Keep up the good work!
                                                    </Text>
                                                </Center>
                                            </Box>
                                        )}
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem className="dg2">
                            <Box>
                                <Box id="hg6" className="hg-header">
                                    <HStack px={4} py={3}>
                                        <Box>
                                            <AiOutlineInfoCircle
                                                className="info-icon"
                                                onClick={seeMoods} />
                                        </Box>
                                        <Box>
                                            <IoAddCircleOutline
                                                className="add-icon"
                                                onClick={addMoods} />
                                        </Box>
                                        <Box px={4}>
                                            <Box >
                                                <h2 className="dash-title">Mood Tracking</h2>
                                            </Box>
                                        </Box>
                                    </HStack>
                                </Box>
                                <Box overflow="hidden" backgroundColor="white">
                                    {!props.moods[0] ? (
                                        <Center>
                                            <Box
                                                height="28vh"
                                                width="30vw">
                                                You don't have any daily moods logged yet. <br />Click the (+) sign to get started!
                                        </Box>
                                        </Center>
                                    ) : (
                                            <Box>
                                                <Center>
                                                    <Box
                                                        height="28vh"
                                                        width="30vw">
                                                        <HorizontalBar
                                                            data={moodChart}
                                                        />
                                                    </Box>
                                                </Center>
                                                <Center>
                                                    <Text
                                                        fontSize="small"
                                                        fontFamily="Boing" fontWeight="medium"
                                                        textAlign="center"
                                                        width="90%"
                                                    >Based on the chart above, it seems like you haven't been feeling great. <br />Could more sleep help?
                                                </Text>
                                                </Center>
                                            </Box>
                                        )}
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem className="dg3">
                            {!weather && <Center>Weather is loading!</Center>}
                            {weather && (

                                <HStack
                                    divider={
                                        <Center>
                                            <StackDivider
                                                height="100px"
                                                borderColor="gray.200"
                                                spacing="10px"
                                                px={4}
                                            />
                                        </Center>
                                    }>
                                    <Box p={6}>
                                        <Center>
                                            <img src="https://i.ibb.co/Zh02jPQ/weather.png" alt="weather" border="0" width={105} height={105} />
                                        </Center>
                                    </Box>
                                    <Box>
                                        <div>
                                            <h1 className="dw-title">Weather in {weather.name}</h1>
                                            <h2 className="dw-title" ><span className="dw-high-temp">{highFahrenheit}°F </span> / <span className="dw-low-temp">{lowFahrenheit}°F </span></h2>
                                        </div>
                                    </Box>
                                </HStack>
                            )}
                        </GridItem>
                        <GridItem className="dg4">
                            <Box>
                                <Box id="dg4">
                                    <div className="hg-header">
                                        <h2 className="hg-title"> Quotes for Your Day</h2>
                                    </div>
                                </Box>
                                <Center py={2} px={2}>
                                    <HStack spacing="25px" height="100%" divider={<Center><StackDivider height="80px" borderColor="gray.200" /></Center>}>
                                        <Box p={4}>
                                            <Center>
                                                <ImQuotesLeft fontSize="50px" />
                                            </Center>
                                        </Box>
                                        <Box>
                                            <div>
                                                <h3 className="dq-title">{quote.a}:</h3>
                                                <h2 className="dash-quote">{quote.q}</h2>
                                            </div>
                                        </Box>
                                    </HStack>
                                </Center>
                            </Box>
                        </GridItem>
                        <GridItem className="dg5" position="relative">
                            <Box>
                                <Box id="hg1" className="hg-header">
                                    <HStack px={4} py={3}>
                                        <Box>
                                            <AiOutlineInfoCircle
                                                className="info-icon"
                                                onClick={seeMeals} />
                                        </Box>
                                        <Box>
                                            <IoAddCircleOutline
                                                className="add-icon"
                                                onClick={addMeals} />
                                        </Box>
                                        <Box px={4}>
                                            <Box >
                                                <h2 className="dash-title">Macros - Diet Tracking</h2>
                                            </Box>
                                        </Box>
                                    </HStack>
                                </Box>
                                {!props.meals[0] ? (
                                    <Center>
                                        <Box
                                            height="28vh"
                                            width="30vw">
                                            You don't have any meals added yet. <br />Click the (+) sign to get started!
                                        </Box>
                                    </Center>
                                ) : (
                                        <Box>
                                            <Box my={8}>
                                                <Doughnut
                                                    data={donutChart}
                                                />
                                            </Box>
                                            <Box>
                                                <Grid className="meal-container">
                                                    <GridItem className="m1" textAlign="center">
                                                        <Text fontFamily="Boing" fontWeight="bolder">
                                                            <span className="logo">
                                                                {props.meals[0]}<span className="logo-dot">g</span> </span> Protein
                                                </Text>
                                                    </GridItem>
                                                    <GridItem className="m2" textAlign="center">
                                                        <Text fontFamily="Boing" fontWeight="bolder">
                                                            <span className="logo">
                                                                {props.meals[1]}<span className="logo-dot">g</span> </span> Carbs
                                                </Text>
                                                    </GridItem>
                                                    <GridItem className="m3" textAlign="center">
                                                        <Text fontFamily="Boing" fontWeight="bolder">
                                                            <span className="logo">
                                                                {props.meals[2]}<span className="logo-dot">g</span> </span> Fat
                                                        </Text>
                                                    </GridItem>
                                                    <GridItem className="m5">
                                                        <Center>
                                                            <Text
                                                                fontSize="small"
                                                                fontFamily="Boing" fontWeight="medium"
                                                                textAlign="center"
                                                                width="90%"
                                                            >You have an average of <span
                                                                className="cal-dot"
                                                            >{props.avgCalories} </span>with each meal. <br />You might need a few more to hit your goals.
                                                             </Text>
                                                        </Center>
                                                    </GridItem>
                                                    <GridItem className="m4">
                                                        <Center>
                                                            <Divider />
                                                        </Center>
                                                    </GridItem>
                                                </Grid>
                                            </Box>
                                        </Box>
                                    )}
                            </Box>
                        </GridItem>
                        <GridItem className="dg6">
                            <Box>
                                <div>
                                    <Box id="hg5" className="hg-header">
                                        <HStack px={4} py={3}>
                                            <Box>
                                                <AiOutlineInfoCircle
                                                    className="info-icon"
                                                    onClick={seeSleep} />
                                            </Box>
                                            <Box>
                                                <IoAddCircleOutline
                                                    className="add-icon"
                                                    onClick={addSleep} />
                                            </Box>
                                            <Box px={4}>
                                                <Box >
                                                    <h2 className="dash-title">Sleep Tracking</h2>
                                                </Box>
                                            </Box>
                                        </HStack>
                                    </Box>
                                    <Box px={4} py={4}>
                                        {props.sleeps[0] == null ? (
                                            <Center>
                                                <Box
                                                    height="28vh"
                                                    width="30vw">
                                                    You don't have any sleep logs added yet. <br />Click the (+) sign to get started!
                                                </Box>
                                            </Center>
                                        ) : (
                                                <Box>
                                                    <Table variant="simple">
                                                        <Thead>
                                                            <Tr>
                                                                <Th>Date</Th>
                                                                <Th>Start Time</Th>
                                                                <Th>End Time</Th>
                                                            </Tr>
                                                        </Thead>
                                                        <Tbody>
                                                            <Sleeps sleepData={props.sleeps}/>
                                                            {/* <Tr>
                                                                <Td>{sleeps[0].date}</Td>
                                                                <Td>{sleeps[0].start_time}</Td>
                                                                <Td>{sleeps[0].end_time}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>{props.sleeps[1].date}</Td>
                                                                <Td>{props.sleeps[1].start_time}</Td>
                                                                <Td>{props.sleeps[1].end_time}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Td>{props.sleeps[2].date}</Td>
                                                                <Td>{props.sleeps[2].start_time}</Td>
                                                                <Td>{props.sleeps[2].end_time}</Td>
                                                            </Tr> */}
                                                        </Tbody>
                                                    </Table>
                                                    <Box>
                                                        <Grid className="s-container" mt={10}>
                                                            <GridItem className="s1">
                                                                <Box>
                                                                    <Center>
                                                                        <img src="https://i.ibb.co/w70VrVc/sleep.png" alt="sleep" border="0" width="50%"
                                                                        />
                                                                    </Center>
                                                                </Box>
                                                            </GridItem>
                                                            <GridItem className="s2">
                                                                <Center>
                                                                    <Divider orientation="vertical"
                                                                        height="150px" borderColor="gray.200"
                                                                        margin="auto"
                                                                    />
                                                                </Center>
                                                            </GridItem>
                                                            <GridItem className="s3">
                                                                <Box>
                                                                    <Center>
                                                                        <Text
                                                                            fontFamily="Boing" fontWeight="medium"
                                                                            textAlign="center"
                                                                            width="90%"
                                                                            fontSize="1.1vw"
                                                                        >It looks like you sleep and average of<br /> <span className="cal-dot">6.5 hours </span> each night. <br />Try going to bed a little earlier to get a full 8 hours.
                                                                        </Text>
                                                                    </Center>
                                                                </Box>
                                                            </GridItem>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                            )}
                                    </Box>
                                </div>
                            </Box>
                        </GridItem>
                    </Grid>
                </Center>
            </div>
        </>
    )
}

export default Charts
