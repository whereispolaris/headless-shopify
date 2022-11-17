import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { Box, Grid, Text, Image } from '@chakra-ui/react'
import Hero from "../components/Hero";
import ImageWithText from "../components/ImageWithText";

const Home = () => {

    // Pulls in fectAllProducts function from shopContext 
    const { fetchAllProducts, products } = useContext(ShopContext)

    useEffect(() => {
        // Grab all products when anything inside this function changes or when new products are available
        fetchAllProducts();
    }, [fetchAllProducts])

    // Return loading message if no products are availables
    if (!products) return <div>Loading...</div>

    return (
        <Box>
            <Hero/>
            <Grid templateColumns="repeat(3, 1fr)">
                {
                    products.map(product => (
                        <Link
                            to={`/products/${product.handle}`}
                            key={product.id}>
                            <Box _hover={{ opacity: '80%' }} textAlign="center" position="relative">
                                <Image src={product.images[0].src} />
                                <Text position="absolute" bottom="15%" w="50%" backgroundColor="blue.500" color="white" fontWeight="bold" boxShadow="5px 5px 5px 0px rgba(0,0,0,0.75);" borderRadius="2px">{product.title}</Text>
                                <Text position="absolute" bottom="5%" w="50%" color="gray.500">{product.variants[0].price}</Text>
                            </Box>
                        </Link>
                    ))
                }
            </Grid>
            <ImageWithText
                reverse
                image="https://picsum.photos/seed/picsum/900/900"
                heading="Peace of Mind"
                text="Enjoy the products you love with the protection you need"
            />
            <ImageWithText
                image="https://picsum.photos/id/33/900/900"
                heading="Get Out There"
                text="The great outdoors awaits"
            />
        </Box>
    )
}

export default Home
