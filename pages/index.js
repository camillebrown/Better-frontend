import { Grid, GridItem, HStack, Stack, Box, Text, StackDivider, Divider, Center } from "@chakra-ui/react"
import axios from "axios"
import React, { useState, useEffect } from "react";
import { ImQuotesLeft } from "react-icons/im";
import { Doughnut, HorizontalBar, Line } from 'react-chartjs-2';

function Home() {

  useEffect(() => {
    getWeather()
    getQuote()
  }, [])

  const getWeather = () => {
    axios.get('https://api.openweathermap.org/data/2.5/weather?zip=90045,us&appid=f4a5477638ec2bad03e7ef91172e8f5d')
      .then((res) => {
        setWeather(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const [quote, setQuote] = useState()
  const [weather, setWeather] = useState({ main: { temp_max: 90, temp_min: 75 } })

  const getQuote = () => {
    axios.get('https://zenquotes.io/api/today')
      .then((data) => {
        setQuote(data.data[0].q)
      })
      .catch(err => {
        console.log(err)
      })
  }

  let highFahrenheit = Math.round(((weather.main.temp_max - 273.15) * 9 / 5 + 32) * 10) / 10
  let lowFahrenheit = Math.round(((weather.main.temp_min - 273.15) * 9 / 5 + 32) * 10) / 10

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
        <div className="main-img">
        </div>
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
                <Box paddingBottom={3}>
                  <Divider width="80%" borderColor="#ee9288" margin="auto" />
                  <Text textAlign="center" my={3} mx={5} fontWeight="light">
                    Track your daily meals to manage your macronutrients and meet your fitness goals. We'll help you stay consistent!
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
              <Box overflow="hidden" backgroundColor="white" paddingBottom={3}>
                <Box paddingLeft={1} paddingRight={1}>
                  <Line
                    data={fitData}
                  />
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg4">
            <HStack mt={1} spacing="10px" verticalAlign="middle" divider={<StackDivider height="50px" borderColor="gray.200" />}>
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
            <HStack mt={0.5} spacing="10px" verticalAlign="middle" divider={<Center><StackDivider height="50px" borderColor="gray.200" /></Center>}>
              <Box ml="20px" mt="3px" mb="3px">
                <img src="https://i.ibb.co/Zh02jPQ/weather.png" alt="weather" border="0" width={55} height={55} />
              </Box>
              <Box>
                <div className="hg-header">
                  <h3 id="wtext">Weather in {weather.name}</h3>
                  <h2><span className="high-temp">{highFahrenheit}°F </span> / <span className="low-temp">{lowFahrenheit}°F </span></h2>
                </div>
              </Box>
            </HStack>
          </GridItem>
          <GridItem className="hg5" position="relative">
            <Box>
              <Box id="hg5">
                <div className="hg-header">
                  <h2 className="hg-title">Sleep</h2>
                </div>
              </Box>
              <Stack direction="row" >
                <Grid className="sgrid">
                  <GridItem className="sg1">
                    <Box>
                      <img src="https://i.ibb.co/w70VrVc/sleep.png" alt="sleep" border="0" />
                    </Box>
                  </GridItem>
                  <GridItem className="sg2">
                    <Center height="150px">
                      <Divider orientation="vertical" />
                    </Center>
                  </GridItem>
                  <GridItem className="sg3">
                    <Box>
                      <Text color="black" fontWeight="light">
                        Are you sleeping enough each night? Could sleeping more make you feel <span className="logo">
                          better<span className="logo-dot">?</span></span>
                      </Text>
                    </Box>
                  </GridItem>
                </Grid>
              </Stack>
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
      <Box mx={4} my={4} textAlign="center">
        <h1>
          <span className="logo" id="welcome-title">
            About Better <span className="about-dot">.</span>
          </span>
        </h1>
        <Text fontFamily='Boing' className="about">Better Fitness<span className="about-dot">.</span>Better Diet<span className="about-dot">.</span>Better Sleep<span className="about-dot">.</span>Better Mood<span className="about-dot">.</span>Better<span className="you-dot">You.</span></Text>
        <Text fontWeight="light" mt={4} mb={4}>
          The Better. App was created to help you manage your own personal goals and start improving the parts of your life that are a bit out of wack. Struggling to get enough nutrients each day? Track your meals to manage your calorie intake and hit those macros. Consistently have the Monday blues? Find activities that can improve your mood over time. Hitting the gym is already hard enough but maybe see how many calories you've burned will motivate you to keep going. And we all know at least 8 hours of sleep gets rid at least reduces your need for morning coffee from 3 to 2. Get started today to start feeling, well   ...   'better'.
        </Text>
      </Box>
    </>
  )
}

export default Home