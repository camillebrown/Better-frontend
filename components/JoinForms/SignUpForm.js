import React, { useState } from 'react'
import { Stack, Input, FormControl, InputLeftElement, InputGroup, Button, FormHelperText } from "@chakra-ui/react"
import { InfoIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import { register } from '../../services/users.service'
import Router from "next/router";

const SignUpForm = () => {

    const [signupData, setSignupData] = useState(
        {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: ""
        }
    )

    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value })
    }

    //axios call here to backend to register
    const signup = (e) => {
        e.preventDefault()
        console.log(signupData.firstName)
        register(signupData.firstName, signupData.lastName, signupData.username, signupData.email, signupData.password)
            .then((data) => {
                let userData = data.data.data;
                console.log('PULLING FROM THE BACKEND', userData);
                Router.push("/profile")
            }).catch((err) => {
                console.log("error registering user", err)
            })
    }

    return (
        <form action="submit" onSubmit={signup}>
            <Stack spacing={4}>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<InfoIcon />} />
                        <Input
                            type="name"
                            placeholder="First Name"
                            aria-label="First Name"
                            name="firstName"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<InfoIcon />} />
                        <Input
                            type="name"
                            placeholder="Last Name"
                            aria-label="Last Name"
                            name="lastName"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<InfoIcon />} />
                        <Input
                            type="text"
                            placeholder="Username"
                            aria-label="Username"
                            name="username"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<EmailIcon />} />
                        <Input
                            type="text"
                            placeholder="Email"
                            aria-label="Email"
                            name="email"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<LockIcon />} />
                        <Input
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            name="password"
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>
                <Button
                    // type="submit"
                    variant="solid"
                    variantcolor="red"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg" }}
                    _active={{ boxShadow: "lg" }}
                    onClick={signup}
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