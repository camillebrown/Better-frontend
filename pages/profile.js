import React, { useState, useEffect } from 'react';
import { Text, Box, Spinner } from "@chakra-ui/react"
import axios from 'axios';
import Daily from '../components/Dashboard/Daily'
import Charts from '../components/Dashboard/Charts'
var dayjs = require('dayjs')
var localizedFormat = require('dayjs/plugin/localizedFormat')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
var moment = require('moment');

const profile = () => {
    var now = dayjs().format('LL')
    var fNow = dayjs().format('ddd, DD MMM YYYY')

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])
    const [settings, setSettings] = useState([])
    const [moods, setMoods] = useState()
    const [meals, setMeals] = useState([])
    const [todayMacros, setTodayMacros] = useState([])
    const [sleeps, setSleeps] = useState([])
    const [avgCalories, setAvgCalories] = useState("")
    const [workouts, setWorkouts] = useState([])
    let numRatings = [0, 0, 0, 0, 0, 0, 5]
    let avgMacros = [0, 0, 0]
    let todayCals = []
    let todayCarbs = []
    let todayFats = []
    let todayProtein = []

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    const getUserInfo = () => {
        axios.get(`http://localhost:8000/api/v1/users/`,
            { withCredentials: true }
        )
            .then((res) => {
                setUser(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        axios.get(`http://localhost:8000/profile/`,
            { withCredentials: true }
        )
            .then((res) => {
                setSettings(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
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

                res.data.data.forEach(meal => {
                    let date = (meal.created_at).substring(0,16)
                    if (date === fNow) {
                        todayCals.push(meal.total_calories)
                        todayFats.push(meal.fat)
                        todayCarbs.push(meal.carbs)
                        todayProtein.push(meal.protein)

                        let TCL = todayCals.reduce((a, b) => a + b, 0)
                        let TF = todayFats.reduce((a, b) => a + b, 0)
                        let TCB = todayCarbs.reduce((a, b) => a + b, 0)
                        let TP = todayProtein.reduce((a, b) => a + b, 0)
                        setTodayMacros([TCL, TF, TCB, TP])
                    } else {
                        setTodayMacros(null)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:8000/sleeps/`,
            { withCredentials: true })
            .then((res) => {
                let latestSleeps = res.data.slice(Math.max(res.data.length - 3, 0))
                setSleeps(latestSleeps)
                for (let sleep in latestSleeps) {
                    let iSleep = latestSleeps[sleep]
                    sleeps[sleep].date = moment(iSleep.date).format("MMM Do")
                    sleeps[sleep].start_time = moment(iSleep.start_time, 'HH:mm:ss').format('h:mm:ss A')
                    sleeps[sleep].end_time = moment(iSleep.end_time, 'HH:mm:ss').format('h:mm:ss A')
                }
                setSleeps(sleeps)
            })
            .catch(err => {
                console.log(err)
            })
        axios.get(`http://localhost:8000/workouts/`,
            { withCredentials: true }
        )
            .then((res) => {
                let calArray = [0, 0]
                res.data.data.forEach(workout => {
                    let calories = workout.calories
                    calArray.push(calories)
                });
                setWorkouts(calArray)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
            {loading &&
                <Spinner
                    thickness="6px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    my={16}
                    mx="45%"
                />
            }
            {!loading && (
                <div>
                    <Box mx={4} my={4} textAlign="center">
                        <h1>
                            <span className="logo" id="welcome-title">
                                Welcome!
                             <span className="logo-dot">
                                    {user.first_name}
                                </span>
                            </span>
                        </h1>
                        <Text>
                            Checkout your dashboard below to see your daily insights and your overall stats for meals, workouts, sleep logs, and moods.
                        </Text>
                    </Box>
                    {!todayMacros ? (
                        <Daily />
                    ) : (
                            <Daily todayMacros={todayMacros} />
                        )}
                    <Charts user={user} avgCalories={avgCalories} settings={settings} moods={moods} sleeps={sleeps} meals={meals} workouts={workouts} />
                </div>
            )}
        </>
    )
}

export default profile