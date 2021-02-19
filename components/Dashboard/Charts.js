import React, { useState, useEffect } from 'react';
import { Grid, GridItem, HStack, Table, Thead, Tbody, Tr, Th, Td, chakra, Box, Text, StackDivider, Divider, Center } from "@chakra-ui/react"
import axios from 'axios'
import { ImQuotesLeft } from "react-icons/im";
import { Doughnut, HorizontalBar, Line } from 'react-chartjs-2';
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-table"

const Charts = () => {
    useEffect(() => {
        getMoods(),
            getMeals(),
            getQuote()
    }, [])

    const [quote, setQuote] = useState("")
    const [moods, setMoods] = useState()
    const [meals, setMeals] = useState([])
    const [avgCalories, setAvgCalories] = useState("")
    let numRatings = [0, 0, 0, 0, 0, 0, 5]
    let avgMacros = [0, 0, 0]

    const getMoods = () => {
        axios.get(`http://localhost:8000/moods/`,
            { withCredentials: true }
        )
            .then((res) => {
                let ratings = res.data.ratings
                for (let i = 0; i < ratings.length; i++) {
                    if (ratings[i] === "Wow, today sucks!") {
                        numRatings[0] += 1
                    } else if (ratings[i] === "Not good, but I guess it could be worse.") {
                        numRatings[1] += 1
                    } else if (ratings[i] === "Ya know, I'm alright today.") {
                        numRatings[2] += 1
                    } else if (ratings[i] === "Today's been kinda great.") {
                        numRatings[3] += 1
                    } else if (ratings[i] === "This was the most amazing day!") {
                        numRatings[4] += 1
                    }
                }
                setMoods(numRatings)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getMeals = () => {
        axios.get(`http://localhost:8000/meals/`,
            { withCredentials: true }
        )
            .then((res) => {
                var fatTotal = 0;
                var carbTotal = 0;
                var proteinTotal = 0;
                var calTotal = 0;
                for (var i = 0; i < res.data.fats.length; i++) {
                    fatTotal += res.data.fats[i];
                }
                var avgFats = Math.round((fatTotal / res.data.fats.length) * 10) / 10;
                avgMacros[2] = avgFats
                // ======================================= //
                for (var i = 0; i < res.data.proteins.length; i++) {
                    proteinTotal += res.data.proteins[i];
                }
                var avgProtein = Math.round((proteinTotal / res.data.proteins.length) * 10) / 10;
                avgMacros[0] = avgProtein
                // ======================================= //
                for (var i = 0; i < res.data.carbs.length; i++) {
                    carbTotal += res.data.carbs[i];
                }
                var avgCarbs = Math.round((carbTotal / res.data.carbs.length) * 10) / 10;
                avgMacros[1] = avgCarbs
                // ======================================= //
                for (var i = 0; i < res.data.calories.length; i++) {
                    calTotal += res.data.calories[i];
                }
                var avgCals = Math.round((calTotal / res.data.calories.length) * 10) / 10;
                setAvgCalories(avgCals)
                setMeals(avgMacros)
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
                backgroundColor: '#ffbe30',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,0,54,0.4)',
                data: moods
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
            data: meals,
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

    return (

        <>
            <div>
                <Center>
                    <Grid className="dash-grid">
                        <GridItem className="dg1">
                            <Box>
                                <Box id="hg2">
                                    <div className="hg-header">
                                        <h2 className="hg-title">Steps - Fitness Tracking</h2>
                                    </div>
                                </Box>
                                <Box overflow="hidden" backgroundColor="white">
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem className="dg2">
                            <Box>
                                <Box id="hg6">
                                    <div className="hg-header">
                                        <h2 className="hg-title">Mood</h2>
                                    </div>
                                </Box>
                                <Box overflow="hidden" backgroundColor="white">
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
                            </Box>
                        </GridItem>
                        <GridItem className="dg3">
                        </GridItem>
                        <GridItem className="dg4">
                            <Box>
                                <Box id="dg4">
                                    <div className="hg-header">
                                        <h2 className="hg-title"> Quotes for Your Day</h2>
                                    </div>
                                </Box>
                                <Center  py={2} px={2}>
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
                                <Box id="hg1">
                                    <div className="hg-header">
                                        <h2 className="hg-title">Macros - Diet Tracking</h2>
                                    </div>
                                </Box>
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
                                                    {meals[0]}<span className="logo-dot">g</span> </span> Protein
                                                </Text>
                                        </GridItem>
                                        <GridItem className="m2" textAlign="center">
                                            <Text fontFamily="Boing" fontWeight="bolder">
                                                <span className="logo">
                                                    {meals[1]}<span className="logo-dot">g</span> </span> Carbs
                                                </Text>
                                        </GridItem>
                                        <GridItem className="m3" textAlign="center">
                                            <Text fontFamily="Boing" fontWeight="bolder">
                                                <span className="logo">
                                                    {meals[2]}<span className="logo-dot">g</span> </span> Fat
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
                                                >{avgCalories} </span>with each meal. <br />You might need a few more to hit your goals.
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
                        </GridItem>
                        <GridItem className="dg6">
                            <Box>
                                <div>
                                    <Box id="hg5">
                                        <div className="hg-header">
                                            <h2 className="hg-title">Sleep</h2>
                                        </div>
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
