import React, { useState, useEffect } from 'react';
import { Grid, GridItem, HStack, Box, Text, Divider, Center } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger, faLaughWink, faBed, faRunning } from '@fortawesome/free-solid-svg-icons'
var dayjs = require('dayjs')
var localizedFormat = require('dayjs/plugin/localizedFormat')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
import axios from 'axios'

export const Daily = (props) => {

  console.log("WE GOT MACROS IN HERE??!", props.todayMacros)
  // setTodayMacros([TCL, TF, TCB, TP])
  var now = dayjs().format('LL')
  var fNow = dayjs().format('ddd, DD MMM YYYY')

  const [mood, setMood] = useState(null)
  const [rating, setRating] = useState()
  const [meals, setMeals] = useState([])
  const [sleep, setSleep] = useState([])
  const [sleeps, setSleeps] = useState([])
  const [avgCalories, setAvgCalories] = useState("")
  const [numWork, setNumWork] = useState("")
  const [workouts, setWorkouts] = useState([])

  const getTodayStats = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/moods/`,
      { withCredentials: true }
    )
      .then((res) => {
        let ratings = res.data.ratings
        if (!res.data.data) {
          setMood(null)
        }
        res.data.data.forEach((mood, i) => {
          let date = mood.date.substring(0, 16)
          let nowFormat = dayjs().format('ddd, DD MMM YYYY')
          if (date === nowFormat) {
            setMood(mood.rating + 1)
            setRating(ratings[i])
          }
        });
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meals/`,
      { withCredentials: true }
    )
      .then((res) => {
        res.data.data.forEach(meal => {
          let date = (meal.created_at).substring(0, 16)
          if (date === fNow) {
            let meals = []
            meals.push(meal)
            setMeals(meals)
          }
        });
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sleeps/`,
      { withCredentials: true }
    )
      .then((res) => {
        setSleeps(res.data)
        res.data.forEach(sleep => {
          let date = dayjs(sleep.date).format('LL')
          if (date === now) {
            const time1 = dayjs().hour(sleep.end_time.substring(0, 2))
            const time2 = dayjs().hour(sleep.start_time.substring(0, 2))
            let hours = time1.diff(time2, 'hour')
            let sleepTime = hours + 24
            setSleep(sleepTime)
          } else {
            setSleep(null)
          }
        });
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts/`,
      { withCredentials: true }
    )
      .then((res) => {
        let array = res.data.data
        var total = 0;
        for (var i = 0; i < res.data.data.length; i++) {
          total += res.data.data[i].calories;
        }
        var avg = total / res.data.data.length;
        setAvgCalories(avg)
        array.forEach(workout => {
          let date = workout.created_at.substring(0, 16)
          if (date === fNow) {
            let finalWorkouts = []
            finalWorkouts.push(workout)
            setWorkouts(finalWorkouts)
            setNumWork(finalWorkouts.length)
          }

        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getTodayStats()
  }, [])

  return (
    <Center>
      <Grid className="daily-container ">
        <GridItem className="dc1">
          <Box>
            <Box id="dc2">
              <div className="dc-header">
                <h2 className="dc-title">{now}</h2>
              </div>
            </Box>
          </Box>
        </GridItem>
        <GridItem className="dc2">
          <HStack px={4} py={2}>
            <Box>
              <FontAwesomeIcon
                className="icons"
                id="run-icon"
                icon={faRunning} />
            </Box>
            <Box px={4}>
              {workouts.length === 0 ? (
                <Box>
                  <Text className="daily-text">
                    You haven’t logged any workouts today
                                    </Text>
                  <Text className="daily-info">
                    Add your workout activity to your fitness tracker to see how it’s impacting your goals
                                    </Text>
                </Box>
              ) : (
                <Box>
                  <Text className="daily-text">
                    You've logged {numWork} workout(s) today!
                                    </Text>
                  <Text className="daily-info">
                    Throughout all of your workouts today, you've burned an average of {avgCalories} with each workout. Great job!
                                    </Text>
                </Box>
              )}
            </Box>
          </HStack>
        </GridItem>
        <GridItem className="dc3">
          <HStack px={4} py={2}>
            <Box>
              <FontAwesomeIcon
                className="icons"
                id="bed-icon"
                icon={faBed} />
            </Box>
            <Box px={4}>
              {sleeps.length === 0 ? (
                <Box>
                  <Text className="daily-text">
                    You haven’t added a sleep log today
                                    </Text>
                  <Text className="daily-info">
                    Add a sleep log to your sleep tracker to see how it’s impacting your goals
                                    </Text>
                </Box>
              ) : (
                <Box>
                  <Text className="daily-text">
                    You logged {sleep} hours of sleep from last night!
                                        </Text>
                  <Text className="daily-info">
                    Does this line up with your sleep goals?
                                        </Text>
                </Box>
              )}
            </Box>
          </HStack>
        </GridItem>
        <GridItem className="dc4">
          <HStack px={4} py={2}>
            <Box>
              <FontAwesomeIcon
                className="icons"
                icon={faHamburger} />
            </Box>
            <Box px={4}>
              {meals.length === 0 || !props.todayMacros ? (
                <Box>
                  <Text className="daily-text">
                    You haven’t logged any meals today
                                    </Text>
                  <Text className="daily-info">
                    Let's get some added to your diet tracker to see how it’s impacting your goals
                            </Text>
                </Box>
              ) : (
                <Box>
                  <Text className="daily-text">
                    You've consumed {props.todayMacros[0]} calories today!
                                        </Text>
                  <Text className="daily-info">
                    Here's your macrnutrient breakdown:<br />{props.todayMacros[3]}g Protein / {props.todayMacros[1]}g Fat / {props.todayMacros[2]}g Carbohydrates
                                        </Text>
                </Box>
              )}
            </Box>
          </HStack>
        </GridItem>
        <GridItem className="dc5">
          <HStack px={4} py={2}>
            <Box>
              <FontAwesomeIcon
                className="icons"
                icon={faLaughWink} />
            </Box>
            <Box px={4}>
              {!mood ? (
                <Box>
                  <Text className="daily-text">
                    You haven’t added a mood log today
                                </Text>
                  <Text className="daily-info">
                    Add a mood log to your mood tracker to see how it’s impacting your goals
                                </Text>
                </Box>
              ) : (
                <Box>
                  <Text className="daily-text">
                    This is your mood today:<br /> "{rating}""
                                        </Text>
                  <Text className="daily-info">
                    You gave today a {mood}/5. Could it be better?
                                        </Text>
                </Box>
              )}
            </Box>
          </HStack>
        </GridItem>
        <GridItem className="dc6">
          <Center>
            <Divider />
          </Center>
        </GridItem>

      </Grid >
    </Center >
  )
}

export default Daily