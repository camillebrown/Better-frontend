import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import SignUpForm from '../components/JoinForms/SignUpForm'
import LoginForm from '../components/JoinForms/LoginForm'

const join = () => {
    return (
        <>
            <div className="main-img">
            </div>
            <Box
                className="meal-form"
                boxShadow="lg"
                rounded="lg">
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
        </>
    )
}

export default join