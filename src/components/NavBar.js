import React, { useContext } from 'react'
import {Badge, Box, Flex, Icon, Image, Text} from '@chakra-ui/react'
import { ShopContext } from '../context/shopContext'
import { Link } from 'react-router-dom'
import { MdMenu, MdShoppingBasket } from 'react-icons/md'
import headless from '../img/headless.png'

const NavBar = () => {

    const { openCart, openMenu, checkout } = useContext(ShopContext);

    return (
        <Flex backgroundColor="#090637" flexDir="row" alignItems="center" justifyContent="space-between" p="1rem">
            <Icon fill="white" as={MdMenu} w="30" h="30"
                  onClick={() => openMenu()}
            />
            <Link to="/"><Image src={headless} w="100" h="100"/></Link>
            <Box>
                <Icon fill="white" as={MdShoppingBasket} w="30" h="30"
                      onClick={() => openCart()}
                />
                <Badge backgroundColor="#FF38BD" borderRadius="50%">{checkout.lineItems?.length}</Badge>
            </Box>

        </Flex>
    )
}

export default NavBar