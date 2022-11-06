import React from 'react';
import {Link} from 'react-router-dom'
import {Grid, Box, Text, Image, VStack } from "@chakra-ui/react";


const Footer = () => {
    return (
        <Box backgroundColor="#090637" color="white" fontWeight="bold">
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}>
                <Image src="https://via.placeholder.com/150" />
                <VStack p="2rem">
                    <Link to="/">Electronics</Link>
                    <Link to="/">Furniture</Link>
                    <Link to="/">Jewelry</Link>
                </VStack>
                <VStack p="2rem">
                    <Link to="/">About Us</Link>
                    <Link to="/">Learn More</Link>
                    <Link to="/">Sustainability</Link>
                </VStack>
            </Grid>
            <Box>
                <Text textAlign="center" color="#24AEDE" w="100%" borderTop="1px solid white" p="1rem">
                    &copy; Headless Shopify 2022
                </Text>
            </Box>
        </Box>
    );
};

export default Footer;