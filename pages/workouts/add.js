import { Box, Tabs, TabList, Tab, TabPanel, TabPanels, Image } from '@chakra-ui/react'
import SignUpForm from '../../components/JoinForms/SignUpForm'
import LoginForm from '../../components/JoinForms/LoginForm'

// Variant changes the way the tabs behave

const add = () => {
    return (
        <Box
            w="350px"
            p={3}
            boxShadow="sm"
            rounded="lg">
            <Image src="./security.png" w="80px" mx="auto" my={6}/>
            <Tabs variant="enclosed-colored" isFitted m={4}>
                <TabList>
                    <Tab>Sign Up</Tab>
                    <Tab>Login</Tab>
                </TabList>
                <TabPanels mt={3}>
                    <TabPanel>
                        <SignUpForm />
                    </TabPanel>
                    <TabPanel>
                        <LoginForm />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default add
