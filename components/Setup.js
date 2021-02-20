import React, { useState } from 'react'
import Router from "next/router";
import { Stack, Text, Input, FormControl, InputGroup, Button, Select } from '@chakra-ui/react'
import axios from 'axios'

const setup = () => {

    const [settings, setSettings] = useState({
        active_status: "",
        goal: "",
        zip_code: ""
    })

    const handleChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value })
        console.log(settings)
    }


    const handleSave = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/`, {
            active_status: settings.active_status,
            goal: settings.goal,
            zip_code: settings.zip_code
        }, {
            withCredentials: true
        }
        )
            .then((res) => {
                console.log('SENT REQUEST TO BACKEND')
                console.log('DATA', res.data)
                Router.push("/profile")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <form action="submit" onSubmit={handleSave} >
                <Stack spacing={4}>
                    <Text ml={1} fontWeight="bolder">Location<span
                        className="asterisk">*</span></Text>
                    <FormControl isRequired>
                        <InputGroup>
                            <Input
                                type="text"
                                pattern="[0-9]{5}"
                                placeholder="Zip Code"
                                aria-label="Zip Code"
                                name="zip_code"
                                width="50%"
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </FormControl>
                    <Text ml={1} fontWeight="lighter" fontSize="small" mb="10px">Helps us know when your day starts and ends so we can provide the most accurate data.</Text>
                    <Text ml={1} fontWeight="bolder">Active Status<span
                        className="asterisk">*</span></Text>
                    <FormControl isRequired mb="10px">
                        <Select
                            placeholder="How Active Are You?"
                            name="active_status"
                            onChange={handleChange}>
                            <option value="0">Mostly sedatary (less than 2 hrs a week)</option>
                            <option value="1">Moderate (2-4 hrs a week)</option>
                            <option value="2">Mostly active (more than 4 hrs a week)</option>
                        </Select>
                    </FormControl>
                    <Text ml={1} fontWeight="bolder">Personal Goals<span
                        className="asterisk">*</span></Text>
                    <FormControl isRequired mb="20px">
                    <Select
                            placeholder="How Active Are You?"
                            name="goal"
                            onChange={handleChange}>
                            <option value="0">Feel More Rested😴🌙(Sleep Focused)</option>
                            <option value="1">Feel Happier😊🌟(Mood Focused)</option>
                            <option value="2">Feel Healthier🤗💪(Fitness/Diet Focused)</option>
                            <option value="3">Feel Better🤩✨🏆(All of the Above)</option>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        onSubmit={handleSave}
                        boxShadow="sm"
                        _hover={{ boxShadow: "lg" }}
                    >
                        Save Your Settings
                </Button>
                </Stack>
            </form>
        </div>
    )
}

export default setup