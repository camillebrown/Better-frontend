import React, { useState } from 'react'
import axios from 'axios'
//Stack lets you vertically stack things
//FormControl allows you to control what is required and what is disabled when filling out a form.
//InputGroups puts icons and input fields together
import { Stack, Input, FormControl, InputLeftElement, Icon, InputGroup, Button, Divider, FormHelperText } from "@chakra-ui/react"
import { InfoIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'

const SignUpForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

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
    //axios call here to backend to register
    const register = (e) => {
        e.preventDefault()
        axios.post(
            'http://localhost:8000' + `/api/v1/user/register`,
            {
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                password: password
            }
        ).then((data) => {
            console.log(data.data)
        }).catch((err) => {
            console.log("error registering user", err)
        })
    }

    return (
        <form action="submit">
            <Stack spacing={4}>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<InfoIcon />} />
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
                        <InputLeftElement children={<InfoIcon />} />
                        <Input
                            type="name"
                            placeholder="Last Name"
                            aria-label="Last Name"
                            onChange={onChangeLName}
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
                            value={username}
                            onChange={onChangeUsername}
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
                            value={email}
                            onChange={onChangeEmail}
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
                            value={password}
                            onChange={onChangePassword}
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
                    onClick={register}
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