import React from 'react';
import { Box, Button, Text, Image, Center} from "@chakra-ui/react";
import departmentStore from '../img/department-store.jpeg'

const Hero = () => {
    return (
        <Box backgroundColor="#080636" w="100%" position="relative" h="40vh">
            {/*<Image src={departmentStore}*/}
            {/*h="100%" m="auto" objectFit="stretch" objectPosition={["top", "center"]}*/}
            {/*/>*/}
            <Text
            position="absolute"
            bottom="40%"
            w="100%"
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize="4rem"
            >Everything On Sale</Text>
            <Center>
                <Button
                w="10rem" backgroundColor="#24AEDE" color="white"
                _hover={{opacity: '70%'}} position="absolute" bottom="20%"
                >Shop Now</Button>
            </Center>
        </Box>
    );
};

export default Hero;