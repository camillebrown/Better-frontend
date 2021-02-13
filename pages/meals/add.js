import { Box, Tabs, TabList, Tab, TabPanel, TabPanels, Image } from '@chakra-ui/react'
import MealAdd from '../../components/SubmitForms/Meals/MealAdd'
import MealUpdate from '../../components/SubmitForms/Meals/MealUpdate'

// Variant changes the way the tabs behave

const join = () => {
    return (
        <>
            <h1>Meal Tracker</h1>
            <Box
                w="350px"
                p={3}
                boxShadow="sm"
                rounded="lg">
                <Image src="./security.png" w="80px" mx="auto" my={6} />
                <Tabs variant="enclosed-colored" isFitted m={4}>
                    <TabList>
                        <Tab>Add New</Tab>
                        <Tab>Update Existing</Tab>
                    </TabList>
                    <TabPanels mt={3}>
                        <TabPanel>
                            <MealAdd />
                        </TabPanel>
                        <TabPanel>
                            <MealUpdate />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default join
