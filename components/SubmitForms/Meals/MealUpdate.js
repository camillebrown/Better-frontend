import { Stack, Input, FormControl, InputLeftElement, Icon, InputGroup, Button, FormHelperText, InputRightAddon } from '@chakra-ui/react'

// Form Controls allow you to control what is required and what is disabled

// Input Groups allow you to but two things together in the same input field

const MealAdd = () => {

    return (
        <form action="submit">
            <Stack spacing={4}>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="text"
                            placeholder="Meal Name"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Protein"
                        />
                        <InputRightAddon children="g" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Carbohydrates"
                        />
                        <InputRightAddon children="g" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Fat"
                        />
                        <InputRightAddon children="g" />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <InputGroup>
                        <Input
                            type="number"
                            placeholder="Total Calories"
                        />
                        <InputRightAddon children="calories" />
                    </InputGroup>
                </FormControl>
                <Button
                    type="submit"
                    variant="solid"
                    variantcolor="red"
                    boxShadow="sm"
                    _hover={{ boxShadow: "lg" }}
                >
                    Update Meal
                </Button>

                <FormHelperText textAlign="center">
                    {/* Control + Command + Space allows you to get emojis!! */}
                    Update your meal to <br></br>correct your macros 🥘
                </FormHelperText>

            </Stack>
        </form>
    )
}

export default MealAdd