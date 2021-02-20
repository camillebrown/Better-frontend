import React, { useState, useEffect } from 'react';
import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import MealAdd from '../../components/SubmitForms/Meals/MealAdd'
import MealUpdate from '../../components/SubmitForms/Meals/MealUpdate'
import { withRouter } from 'next/router'


// Variant changes the way the tabs behave

const add = (props) => {
    const meal_id = props.router.query.meal

    return (
        <>
            <div className="img-meal">
            </div>
            <Box
                className="meal-form"
                boxShadow="lg"
                rounded="lg">
                <Tabs variant="enclosed-colored" isFitted m={4}>
                    <TabList>
                        <Tab>Add New</Tab>
                        <Tab>Update Existing</Tab>
                    </TabList>
                    <TabPanels mt={3}>
                        <TabPanel>
                            <MealAdd/>
                        </TabPanel>
                        <TabPanel>
                            <MealUpdate meal={meal_id}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default withRouter(add)