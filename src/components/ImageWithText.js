import React from 'react';
import { Box, Flex, Button, Text, Image, Heading} from "@chakra-ui/react";

const ImageWithText = ({reverse, image, heading, text}) => {

    const reverseSection = reverse ? 'row-reverse' : 'row'

    return (
        <Box>
            <Flex flexDir={['column', reverseSection]} w="100%">
                <Image src={image} objectFit="cover" w={["100%", "50%"]}/>
                <Flex w={["100%", "50%"]} flexDir="column" justifyContent="center" alignItems="center" p="2rem">
                    <Heading p="1rem">
                        {heading && heading}
                    </Heading>
                    <Text p="1rem">
                        {text && text}
                    </Text>
                    <Button w="10rem" backgroundColor="#03c" color="white" _hover={{opacity: '70%'}}>
                        Shop All Products
                    </Button>
                </Flex>
            </Flex>
            
        </Box>
    );
};

export default ImageWithText;