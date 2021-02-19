import React from 'react'
import { Grid, GridItem, HStack, Stack, Box, Text, StackDivider, Divider, Center } from "@chakra-ui/react"

export const Daily = () => {
    return (
        <Center>
            <Grid className="daily-container">
                <GridItem className="daily1">Steps</GridItem>
                <GridItem className="daily2">sleep</GridItem>
                <GridItem className="daily3">meals</GridItem>
                <GridItem className="daily4">mood</GridItem>
                <GridItem className="daily5">
                    <Center>
                        <Divider />
                    </Center>
                </GridItem>
            </Grid>
        </Center>
    )
}

export default Daily