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
                <Box>
                    <Heading pd="2rem">{product.title}</Heading>
                    <Text>{product.variants[0].price}</Text>
                    <Text>{product.description}</Text>
                    {/*Extend - Renders offers on product page*/}
                    <ExtendOffers/>
                    <Button
                        className="add-to-cart"
                        onClick={() => addItemToCheckout(product.variants[0].id, 1)}
                    >Add To Cart</Button>
                </Box>
            </Grid>
        </Box>
    )
}

export default ProductPage
