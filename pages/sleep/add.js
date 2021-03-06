import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import SleepAdd from '../../components/SubmitForms/Sleep/SleepAdd'
import SleepUpdate from '../../components/SubmitForms/Sleep/SleepUpdate'
import { withRouter } from 'next/router'


const add = (props) => {
    const sleep_id = props.router.query.sleep

    return (
        <>
            <div className="img-sleep">
            </div>
            <Box
                className="sleep-form"
                boxShadow="lg"
                rounded="lg">
                <Tabs variant="enclosed-colored" isFitted m={4}>
                    <TabList>
                        <Tab>Add New</Tab>
                        <Tab>Update Existing</Tab>
                    </TabList>
                    <TabPanels mt={3}>
                        <TabPanel>
                            <SleepAdd />
                        </TabPanel>
                        <TabPanel>
                            <SleepUpdate sleep={sleep_id} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default withRouter(add)