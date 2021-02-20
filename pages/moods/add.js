import React, { useState, useEffect } from 'react';
import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import MoodAdd from '../../components/SubmitForms/Mood/MoodAdd'
import MoodUpdate from '../../components/SubmitForms/Mood/MoodUpdate'
import { withRouter } from 'next/router'

const add = (props) => {
    const mood_id = props.router.query.mood

    return (
        <>
            <div className="img-mood">
            </div>
            <Box
                className="mood-form"
                boxShadow="lg"
                rounded="lg">
                <Tabs variant="enclosed-colored" isFitted m={4}>
                    <TabList>
                        <Tab>Add New</Tab>
                        <Tab>Update Existing</Tab>
                    </TabList>
                    <TabPanels mt={3}>
                        <TabPanel>
                            <MoodAdd/>
                        </TabPanel>
                        <TabPanel>
                            <MoodUpdate mood={mood_id}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default withRouter(add)