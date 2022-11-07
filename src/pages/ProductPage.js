import React, { useEffect, useContext, useLayoutEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { Box, Grid, Image, Text, Button, Heading, Flex, Center } from '@chakra-ui/react'
import ExtendOffers from "../components/ExtendOffers";

const ProductPage = () => {

    // Grabs the path from the URL
    const { handle } = useParams();

    // Imports utility functions from ShopContext
    const { fetchProductWithHandle, addItemToCheckout, product } = useContext(ShopContext);

    // Fetches products with handle and listens for changes
    useEffect(() => {
        fetchProductWithHandle(handle)
    }, [fetchProductWithHandle, handle]);

    // Shows loading if there's no product title available
    if (!product.title) return <div>Loading...</div>

    return (
        <Box p="2rem">
            <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]} m="auto">
                <Flex justifyContent="center" alignItems="center">
                    <Image src={product.images[0].src} />
                </Flex>
                <Flex flexDir="column" alignItems="center" justifyContent="center" px="2rem">
                    <Heading pb="2rem">{product.title}</Heading>
                    <Text fontWeight="bold" pb="2rem">{product.variants[0].price}</Text>
                    <Text pb="2rem" color="gray.500">{product.description}</Text>
                    {/*Extend - Renders offers on product page*/}
                    <Box width="100%" pb="1rem">
                        <ExtendOffers/>
                    </Box>

                    <Button
                        className="add-to-cart"
                        onClick={() => addItemToCheckout(product.variants[0].id, 1)}
                        _hover={{opacity : '70%'}}
                        width="50%"
                        backgroundColor="#090637"
                        color="white"
                    >Add To Cart</Button>
                </Flex>
            </Grid>
        </Box>
    )
}

export default ProductPage
