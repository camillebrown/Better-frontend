import React, { useState } from 'react'
import Router from "next/router";
import { Stack, Input, FormControl, InputGroup, Button, FormHelperText, Select, Radio, RadioGroup } from '@chakra-ui/react'
import axios from 'axios'

const setup = () => {

    const [settings, setSettings] = useState({
        active_status: "",
        goal: "",
        time_zone: ""
    })

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value })
    }

    const handleSave = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/moods/`, {
            date: data.date,
            rating: data.rating
        }, {
            headers:
                { withCredentials: true, crossorigin: true }
        }
        )
            .then((res) => {
                console.log('SENT REQUEST TO BACKEND')
                console.log('DATA', res.data)
                Router.push("/moods")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
            <form action="submit" onSubmit={handleSave}>
                <Stack spacing={4}>
                    <FormControl isRequired>
                        <RadioGroup
                            onChange={handleChange} placeholder="How Active Are You?"
                            name="active_status">
                            <Stack direction="row">
                                <Radio value="0">Mostly sedatary (less than 2 hrs a week)</Radio>
                                <Radio value="1">Moderate (2-4 hrs a week)</Radio>
                                <Radio value="2">Mostly active (more than 4 hrs a week)</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <Select
                            placeholder="What is your Primary Goal?"
                            name="goal"
                            onChange={handleChange}>
                            <option value="0">Feel More Rested 😴🌙(Sleep Focused)</option>
                            <option value="1">Feel Happier 😊🌟 (Mood Focused)</option>
                            <option value="2">Feel Healthier 🤗💪 (Fitness/Diet Focused)</option>
                            <option value="3">Feel Better 🤩✨🏆 (All of the Above)</option>
                        </Select>
                    </FormControl>
                    <Button
                        onSubmit={handleSave}
                        type="submit"
                        variant="solid"
                        variantcolor="red"
                        boxShadow="sm"
                        _hover={{ boxShadow: "lg" }}
                    >
                        Save Your Settigns
                </Button>

                    <FormHelperText textAlign="center">
                        {/* Control + Command + Space allows you to get emojis!! */}
                    Log your mood to <br></br>keep track of your daily temperament 😊
                </FormHelperText>
                </Stack>
            </form>
    )
}

export default setup