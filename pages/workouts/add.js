import React, { useState, useEffect } from 'react';
import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import FitnessAdd from '../../components/SubmitForms/Fitness/FitnessAdd'
import FitnessUpdate from '../../components/SubmitForms/Fitness/FitnessUpdate'
import axios from 'axios'
import { withRouter } from 'next/router'


const add = (props) => {
    const workout_id = props.router.query.workout

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
            <h1>Fitness Tracker</h1>
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
                            <FitnessAdd user={user}/>
                        </TabPanel>
                        <TabPanel>
                            <FitnessUpdate workout={workout_id} user={user}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default withRouter(add)
