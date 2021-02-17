import React, { useState, useEffect } from 'react';
import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import FitnessAdd from '../../components/SubmitForms/Fitness/FitnessAdd'
import FitnessUpdate from '../../components/SubmitForms/Fitness/FitnessUpdate'
import { withRouter } from 'next/router'


const add = (props) => {
    const workout_id = props.router.query.workout

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
                            <FitnessAdd/>
                        </TabPanel>
                        <TabPanel>
                            <FitnessUpdate workout={workout_id}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default withRouter(add)
