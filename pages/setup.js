import Setup from '../components/Setup'
import { Grid, GridItem, Box, Text } from "@chakra-ui/react"

const setup = () => {

    const [settings, setSettings] = useState([])

    const getUserInfo = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/`,
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data)
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
            <div>
                <img src="https://i.ibb.co/44gPmn2/Artboard-1.jpg" alt="Artboard-1" border="0" />
                <Grid className="setup-container">
                        <GridItem className="setup1">
                            <Box>
                                <Box id="hg1">
                                    <div>
                                        <h2 className="setup-title">Share a bit more about yourself...</h2>
                                    </div>
                                </Box>
                                <Box overflow="hidden" backgroundColor="white">
                                    <Text paddingLeft={3} pt={2} color="red" fontSize="small">* = required field</Text>
                                    <Box className="setup-fields">
                                        <Setup />
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem className="setup2">
                            <Box>
                                <Box overflow="hidden" backgroundColor="rgb(248, 248, 248)">
                                    <Box paddingLeft={1} paddingRight={1}>
                                        <Text textAlign="center" mt={5} mx={2} fontWeight="400">
                                            Now that you have an account, <br />we need a bit more information to customize it for you!
                                        <br />
                                            <br />
                                            <br />
                                        Complete this process and you’re ready to start being <Text fontFamily='Boing' className="logo">
                                                better<span className="logo-dot">.</span>
                                            </Text>
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>
                </Grid>
            </div>
        </>
    )
}

export default setup
