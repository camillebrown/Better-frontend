import React, { useState } from 'react'
import { Stack, Input, FormControl, InputLeftElement, Icon, InputGroup, Button, FormHelperText, Divider } from '@chakra-ui/react'
import axios from 'axios'
import Router from "next/router";

const SignUpForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const signupUser = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
        console.log(firstName)
        console.log(lastName)
        console.log(username)
        axios.post("http://localhost:8000/api/v1/users/register",
            {
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: password
            })
            .then(() => {
                Router.push("/profile")
            })
            .catch((err) => {
                console.log("error signing up user", err);
            });
    }

    const onChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const onChangeFName = (e) => {
        const firstName = e.target.value
        setFirstName(firstName)
    }

    const onChangeLName = (e) => {
        const lastName = e.target.value
        setLastName(lastName)
    }

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    return (
        <form action="submit" onSubmit={signupUser}>
            <Stack spacing={4}>

                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="info" />} />
                        <Input
                            type="name"
                            placeholder="First Name"
                            aria-label="First Name"
                            onChange={onChangeFName}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="info" />} />
                        <Input
                            type="name"
                            placeholder="Last Name"
                            aria-label="Last Name"
                            onChange={onChangeLName}
                        />
                    </InputGroup>
                </FormControl>
                <Divider borderColor="gray.300" />
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="email" />} />
                        <Input
                            type="text"
                            placeholder="Username"
                            aria-label="Username"
                            onChange={onChangeUsername}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="email" />} />
                        <Input
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
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
                            onChange={onChangePassword}
                        />
                    </InputGroup>
                </FormControl>

                <Button
                    type="submit"
                    onSubmit={signupUser}
                    variant="solid"
                    variantColor="red"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg" }}
                >
                    Sign Up!
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    We will never share your email! 🙏
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default SignUpForm