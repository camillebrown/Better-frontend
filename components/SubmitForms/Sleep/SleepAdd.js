import React, { useState } from 'react'
import Router from "next/router";
import { Stack, Input, FormControl, InputGroup, Button, FormHelperText} from '@chakra-ui/react'
import axios from 'axios'

const SleepAdd = (props) => {
    const [data, setData] = useState(
        {
            date: "",
            start_time: "",
            end_time: ""
        }
    )

    const handleAdd = (e) => {
        e.preventDefault()
        console.log(data)
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sleeps/`, {
            date: data.date,
            start_time: data.start_time,
            end_time: data.end_time
        }, {
            withCredentials: true
        }
        )
            .then((res) => {
                console.log('SENT REQUEST TO BACKEND')
                console.log('DATA', res.data)
                Router.push("/sleep")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <form action="submit" onSubmit={handleAdd}>
            <Stack spacing={4}>

                <FormControl >
                    <InputGroup>
                        <Input
                            type="date"
                            placeholder="Date"
                            name="date"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="time"
                            placeholder="Start Time"
                            name="start_time"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="time"
                            placeholder="End Time"
                            name="end_time"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>

                <Button
                    onSubmit={handleAdd}
                    type="submit"
                    variant="solid"
                    variantcolor="red"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg" }}
                >
                    Save Sleep Log
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    Log your time asleep to <br></br>add your sleeping habits 😴
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default SleepAdd
