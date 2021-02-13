import React, { useState } from 'react'
import { Stack, Input, FormControl, InputLeftElement, Icon, InputGroup, Button, FormHelperText } from '@chakra-ui/react'
import axios from 'axios'
import Router from "next/router";

const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
        axios.post("http://localhost:8000/api/v1/users/login",
            {
                email: email,
                password: password
            })
            .then(() => {
                Router.push("/profile")
            })
            .catch((err) => {
                console.log("error logging in user", err);
            });
    }

    // Store the username in our username state
    const onChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }

    // Store the username in our username state
    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    return (
        <form action="submit" onSubmit={loginUser}>
            <Stack spacing={4}>

                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="email" />} />
                        <Input
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            name="email"
                            onChange={onChangeEmail}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="lock" />} />
                        <Input
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            name="password"
                            onChange={onChangePassword}
                        />
                    </InputGroup>
                </FormControl>
                <Button
                    type="submit"
                    onSubmit={loginUser}
                    variant="solid"
                    variantColor="red"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg" }}
                >
                    Login In!
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    Welcome Back! 👋
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default LoginForm