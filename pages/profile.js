import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@chakra-ui/react"
import Router from "next/router";
import Daily from '../components/Dashboard/Daily'
import Charts from '../components/Dashboard/Charts'
var moment = require('moment');

const profile = () => {


    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])
    const [settings, setSettings] = useState([])
    const [moods, setMoods] = useState()
    const [meals, setMeals] = useState([])
    const [sleeps, setSleeps] = useState([])
    const [avgCalories, setAvgCalories] = useState("")
    const [workouts, setWorkouts] = useState([])
    let numRatings = [0, 0, 0, 0, 0, 0, 5]
    let avgMacros = [0, 0, 0]

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
                let calArray = [0,0]
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

    const seeMoods = () => {
        Router.push("/moods")
    }
    const seeSleep = () => {
        Router.push("/sleep")
    }
    const seeWorkouts = () => {
        Router.push("/workouts")
    }
    const seeMeals = () => {
        Router.push("/meals")
    }

    return (
        <>
            {loading && <div>Page is loading!</div>}
            {!loading && (
                <div>
                    <h1>{user.first_name} </h1>
                    <h1>{user.last_name} </h1>
                    <h1>{user.email} </h1>
                    <h1>{user.id} </h1>
                    {/* 
            <Button
                size="sm"
                onClick={sleep}
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                    bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
            >
                Sleep Logs
            </Button>

            <Button
                size="sm"
                onClick={meals}
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                    bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
            >
                Meals
            </Button>

            <Button
                size="sm"
                onClick={workouts}
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                    bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
            >
                Workouts
            </Button>

            <Button
                size="sm"
                onClick={moods}
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                    bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
            >
                Moods
            </Button> */}
                    <Daily user={user} avgCalories={avgCalories} moods={moods} sleeps={sleeps} meals={meals} workouts={workouts}/>
                    <Charts user={user} avgCalories={avgCalories} settings={settings} moods={moods} sleeps={sleeps} meals={meals} workouts={workouts} />
                </div>
            )}
        </>
    )
}

export default profile