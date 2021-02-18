import { Grid, GridItem, HStack, Box, Text, StackDivider, Divider } from "@chakra-ui/react"
import axios from "axios"
import React, { useState, useEffect } from "react";
import { ImQuotesLeft } from "react-icons/im";
import { Doughnut, HorizontalBar, Line } from 'react-chartjs-2';

function Home() {

  const [quote, setQuote] = useState()

  const getQuote = () => {
    axios.get('https://zenquotes.io/api/today')
      .then((data) => {
        console.log(data.data[0].q)
        setQuote(data.data[0].q)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getQuote()
  }, [])


  const donutData = {
    labels: [
      'Protein',
      'Carbs',
      'Fat'
    ],
    datasets: [{
      data: [300, 175, 75],
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

  const moodData = {
    labels: ['Why?😫', 'Not Good😔', 'Meh🙂', 'Good😄', 'Amazing!🤩'],
    datasets: [
      {
        label: 'Daily Moods',
        backgroundColor: '#ffbe30',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,0,54,0.4)',
        data: [5, 7, 3, 6, 4, 0]
      }
    ]
  };

  const fitData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Daily Steps',
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
        data: [1065, 959, 980, 881, 756, 855, 1040, 700]
      }
    ]
  };

  return (

    <>
      <div>
        <img src="https://i.ibb.co/44gPmn2/Artboard-1.jpg" alt="Artboard-1" border="0" />
        <Grid className="home-grid">
          <GridItem className="hg1">
            <Box>
              <Box id="hg1">
                <div className="hg-header">
                  <h2 className="hg-title">Diet</h2>
                </div>
              </Box>
              <Box overflow="hidden" backgroundColor="white">
                <Box my={8}>
                  <Doughnut
                    data={donutData}
                  />
                </Box>
                <Box>
                  <Divider width="80%" borderColor="#ee9288" margin="auto" />
                  <Text textAlign="center" mt={3} mx={5} fontWeight="light">
                    Track your daily nutrients to manage your macronutrients and meet your fitness goals. We'll help you stay consistent!
                  </Text>
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg2">
            <Box>
              <Box id="hg2">
                <div className="hg-header">
                  <h2 className="hg-title">Fitness</h2>
                </div>
              </Box>
              <Box overflow="hidden" backgroundColor="white">
                <Box paddingLeft={1} paddingRight={1}>
                  <Line
                    data={fitData}
                  />
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg4">
            <HStack mt={1} spacing="10px" verticalAlign="middle" divider={<StackDivider borderColor="gray.200" />}>
              <Box m={3}>
                <ImQuotesLeft fontSize="30px" />
              </Box>
              <Box>
                <div className="hg-header">
                  <h3 id="quote-text">Quote of the day:</h3>
                  <h2 id="hg4">{quote}</h2>
                </div>
              </Box>
            </HStack>
          </GridItem>
          <GridItem className="hg3">
            <HStack mt={0.5} spacing="10px" verticalAlign="middle" divider={<StackDivider borderColor="gray.200"/>}>
              <Box m={3}>
                <img src="https://i.ibb.co/Zh02jPQ/weather.png" alt="weather" border="0" width={55} height={55}/>
              </Box>
              <Box>
                <div className="hg-header">
                  <h3 id="quote-text">Weather</h3>
                  <h2 id="hg4">{quote}</h2>
                </div>
              </Box>
            </HStack>
          </GridItem>
          <GridItem className="hg5">
            <Box>
              <Box id="hg5">
                <div className="hg-header">
                  <h2 className="hg-title">Sleep</h2>
                </div>
              </Box>
              <Box overflow="hidden" backgroundColor="white">
                <Box
                  fontWeight="semibold"
                  lineHeight="short"
                >
                  Introduction to chakra-ui
                </Box>
                <Text color="black" fontWeight="light">
                  Adipisicing ea pariatur ullamco deserunt amet
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg6">
            <Box>
              <div>
                <Box id="hg6">
                  <div className="hg-header">
                    <h2 className="hg-title">Mood</h2>
                  </div>
                </Box>
                <Box>
                  <Box my={8}>
                    <HorizontalBar
                      data={moodData}
                    />
                  </Box>
                  <Divider width="80%" borderColor="#ebaf66" margin="auto" />
                  <Text textAlign="center" mx={5} mt={3} fontWeight="light">
                    Feeling yay or nay?<br />Track how often you're not having the best day and find ways to make it better!
                  </Text>
                </Box>
              </div>
            </Box>
          </GridItem>
        </Grid>
      </div>
    </>
  )
}

export default Home