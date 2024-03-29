import React, { useState, useEffect } from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react"
import Logo from "./Logo";
import axios from 'axios'
import { logout } from '../../services/users.service'

const NavBar = (props) => {

  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color="1A1847"
        ml={10}
        mb={1}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="EA7613"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  const [user, setUser] = useState()


  const getUserInfo = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/`,
      { withCredentials: true }
    )
      .then((res) => {
        setUser(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  // const logOut = () => {
  //   axios.get(
  //     process.env.NEXT_PUBLIC_BACKEND_URL + `/api/v1/users/logout`, { withCredentials: true })
  //   setTimeout(() => {
  //     window.location.replace("/")
  //   }, 500);
  // }

  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
        mr={10}
        mb={1}
      >
        {user ? (
          <>
            <MenuItem to="/profile">{user[0].first_name}'s Dashboard</MenuItem>
            <Button
              size="sm"
              onClick={() => { logout() }}
              rounded="md"
              color="white"
              bg="blue"
              _hover={{
                bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
              }}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <MenuItem to="/join" isLast>
              <Button
                size="sm"
                rounded="md"
                color="white"
                bg="blue"
                _hover={{
                  bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
                }}
              >
                Join Now!
          </Button>
            </MenuItem>
          </>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      h="60px"
      position="absolute"
      bg="rgb(248, 248, 248)"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;