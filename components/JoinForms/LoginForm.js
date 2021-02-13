import { Stack, Input, FormControl, InputLeftElement, Icon, InputGroup, Button, FormHelperText } from '@chakra-ui/react'

// Form Controls allow you to control what is required and what is disabled

// Input Groups allow you to but two things together in the same input field

const LoginForm = () => {

    return (
        <form action="submit">
            <Stack spacing={4}>

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
                    Login In!
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    Welcome Back! 👋
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default LoginForm