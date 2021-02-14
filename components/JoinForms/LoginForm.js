import React, { useState } from "react";
import axios from "axios";
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
import Router from "next/router";
import Cookies from "universal-cookie";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000" + `/api/v1/users/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((data) => {
        let userData = data.data.data;
        console.log('PULLING FROM THE BACKEND', userData);
        Router.push("/profile")
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
  );
};

export default LoginForm;