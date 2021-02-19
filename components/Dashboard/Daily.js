import React from 'react'
import { Grid, GridItem, HStack, Box, Text, Divider, Center } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger, faLaughWink, faBed, faRunning } from '@fortawesome/free-solid-svg-icons'

export const Daily = (props) => {

    const getTodayStats = () => {
        
    }


    return (
        <Center>
            <Grid className="daily-container ">
                <GridItem className="dc1">
                    <Box>
                        <Box id="dc2">
                            <div className="dc-header">
                                <h2 className="dc-title">Today's Date</h2>
                            </div>
                        </Box>
                    </Box>
                </GridItem>
                <GridItem className="dc2">
                    <HStack px={4} py={2}>
                        <Box>
                            <FontAwesomeIcon 
                            className="icons"
                            id="run-icon"
                            icon={faRunning} />
                        </Box>

                        <Box px={4}>
                            <Text id="quote-text">
                                You haven’t logged anything for food today
                            </Text>
                            <Text id="hg4">
                                Add some meals to your diet tracker to see how it’s impacting your goals
                            </Text>
                        </Box>
                    </HStack>
                </GridItem>
                <GridItem className="dc3">
                    <HStack px={4} py={2}>
                        <Box>
                            <FontAwesomeIcon 
                            className="icons"
                            id="bed-icon"
                            icon={faBed} />
                        </Box>
                        <Box px={4}>
                            <Text id="quote-text">
                                You haven’t added a sleep log today
                            </Text>
                            <Text id="hg4">
                                Add a sleep log to your sleep tracker to see how it’s impacting your goals
                            </Text>
                        </Box>
                    </HStack>
                </GridItem>
                <GridItem className="dc4">
                    <HStack px={4} py={2}>
                        <Box>
                            <FontAwesomeIcon 
                            className="icons"
                            icon={faHamburger} />
                        </Box>
                        <Box px={4}>
                            <Text id="quote-text">
                                You haven’t logged any meals today
                            </Text>
                            <Text id="hg4">
                                Let's get some added to your diet tracker to see how it’s impacting your goals
                            </Text>
                        </Box>
                    </HStack>
                </GridItem>
                <GridItem className="dc5">
                    <HStack px={4} py={2}>
                        <Box>
                            <FontAwesomeIcon 
                            className="icons"
                            icon={faLaughWink} />
                        </Box>
                        <Box px={4}>
                            <Text id="quote-text">
                                You haven’t added a mood log today
                            </Text>
                            <Text id="hg4">
                                Add a mood log to your mood tracker to see how it’s impacting your goals
                            </Text>
                        </Box>
                    </HStack>
                </GridItem>
                <GridItem className="dc6">
                    <Center>
                        <Divider />
                    </Center>
                </GridItem>

            </Grid >
        </Center >
    )
}

export default Daily