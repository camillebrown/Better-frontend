import React, { useState } from "react";
import axios from "axios";
import { login } from '../../services/users.service'
import {
  Stack,
  Input,
  FormControl,
  InputLeftElement,
  Icon,
  InputGroup,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

const LoginForm = () => {

  const [loginData, setLoginData] = useState(
    {
      email: "",
      password: ""
    }
  )

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const loginUser = (e) => {
    e.preventDefault();
    // login(loginData.email, loginData.password)
    axios
      .post(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/users/login',
        {
          email: loginData.email,
          password: loginData.password
        },
        { withCredentials: true }
      )
      .then((data) => {
        if (data.data.status.code === 401) {
        }
        else if (data.data.status.code === 200) {
          setTimeout(() => {
            window.location.replace('/profile')
          }, 2000);

        }
      })
      .catch((err) => {
        console.log("error logging in user", err);
      });
  };

  return (
    <form action="submit" onSubmit={loginUser}>
      <Stack spacing={4}>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<EmailIcon />} />
            <InputLeftElement children={<Icon name="email" />} />
            <Input
              type="email"
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
          type="submit"
          onSubmit={loginUser}
          variant="solid"
          variantcolor="red"
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
  );
};

export default LoginForm;
