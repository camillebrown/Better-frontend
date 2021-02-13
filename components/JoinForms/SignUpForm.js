import { Stack, Input, FormControl, InputLeftElement, Icon, InputGroup, Button, Divider, FormHelperText } from '@chakra-ui/react'

// Form Controls allow you to control what is required and what is disabled
// Input Groups allow you to but two things together in the same input field

const SignUpForm = () => {

    return (
        <form action="submit">
            <Stack spacing={4}>

                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="info" />} />
                        <Input
                            type="name"
                            placeholder="First Name"
                            aria-label="First Name"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="info" />} />
                        <Input
                            type="name"
                            placeholder="Last Name"
                            aria-label="Last Name"
                        />
                    </InputGroup>
                </FormControl>
                <Divider borderColor="gray.300" />
                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="email" />} />
                        <Input
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <InputLeftElement children={<Icon name="lock" />} />
                        <Input
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                        />
                    </InputGroup>
                </FormControl>

                <Button
                    type="submit"
                    variant="solid"
                    variantColor="red"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg" }}
                >
                    Sign Up!
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    We will never share your email! 🙏
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default SignUpForm