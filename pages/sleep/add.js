import React, { useState, useEffect } from 'react';
import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import SleepAdd from '../../components/SubmitForms/Sleep/SleepAdd'
import SleepUpdate from '../../components/SubmitForms/Sleep/SleepUpdate'
import axios from 'axios'
import { withRouter } from 'next/router'


const add = (props) => {
    const sleep_id = props.router.query.sleep

    return (
        <>
            <h1>Sleep Tracker</h1>
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
                            <SleepAdd/>
                        </TabPanel>
                        <TabPanel>
                            <SleepUpdate sleep={sleep_id}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default withRouter(add)