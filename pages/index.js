import { Grid, GridItem } from "@chakra-ui/react"
import { Box, Image, Text, Badge, Button, Flex, Spacer } from '@chakra-ui/react'
import { StarIcon } from "@chakra-ui/icons"

function Home() {
  return (
    <>
      <div>
        <img src="https://i.ibb.co/44gPmn2/Artboard-1.jpg" alt="Artboard-1" border="0" />
        <Grid className="home-grid">
          <GridItem className="hg1">
            <Box>
              <Box id="hg1">
                <div className="hg-header">
                  <h2 className="hg-title">Diet</h2>
                </div>
              </Box>
              <Box overflow="hidden" height={300} backgroundColor="white">
                <Box
                  my={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  lineHeight="short"
                  isTruncated
                >
                  Introduction to chakra-ui
                </Box>
                <Text color="black" fontSize="16px" fontWeight="light">
                  Adipisicing ea pariatur ullamco deserunt amet
                  consequat reprehenderit in duis est velit tempor.
                  Ipsum ea ad duis sint aliquip in ullamco in dolor
                  reprehenderit duis ullamco. Irure tempor ullamco...
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg2">
            <Box>
              <Box id="hg2">
                <div className="hg-header">
                  <h2 className="hg-title">Fitness</h2>
                </div>
              </Box>
              <Box overflow="hidden" height={300} backgroundColor="white">
                <Box
                  fontWeight="semibold"
                  lineHeight="short"
                >
                  Introduction to chakra-ui
                </Box>
                <Text color="black" fontWeight="light">
                  Adipisicing ea pariatur ullamco deserunt amet
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg3">
            <Box>
              <Box>
                <div className="hg-header">
                  <h2 className="hg-title" id="hg3">Weather Data</h2>
                </div>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg4">
          <Box>
              <Box>
                <div className="hg-header">
                  <h2 className="hg-title" id="hg4">Quote Here</h2>
                </div>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg5">
          <Box>
              <Box id="hg5">
                <div className="hg-header">
                  <h2 className="hg-title">Meals</h2>
                </div>
              </Box>
              <Box overflow="hidden" backgroundColor="white">
                <Box
                  fontWeight="semibold"
                  lineHeight="short"
                >
                  Introduction to chakra-ui
                </Box>
                <Text color="black" fontWeight="light">
                  Adipisicing ea pariatur ullamco deserunt amet
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem className="hg6" bg="#8A90DB" />

        </Grid>
      </div>
    </>
  )
}

export default Home