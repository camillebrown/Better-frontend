import React, { useState, useEffect } from 'react';
import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import MealAdd from '../../components/SubmitForms/Meals/MealAdd'
import MealUpdate from '../../components/SubmitForms/Meals/MealUpdate'
import axios from 'axios'
import { withRouter } from 'next/router'


// Variant changes the way the tabs behave

const add = (props) => {
    const meal_id = props.router.query.meal

    const [user, setUser] = useState([])

    const getUserInfo = () => {
        axios.get(`http://localhost:8000/profile/`,
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

    return (
        <>
            <h1>Meal Tracker</h1>
            <Box
                w="350px"
                p={3}
                boxShadow="sm"
                rounded="lg">
                <Tabs variant="enclosed-colored" isFitted m={4}>
                    <TabList>
                        <Tab>Add New</Tab>
                        <Tab>Update Existing</Tab>
                    </TabList>
                    <TabPanels mt={3}>
                        <TabPanel>
                            <MealAdd user={user}/>
                        </TabPanel>
                        <TabPanel>
                            <MealUpdate meal={meal_id} user={user}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default withRouter(add)
