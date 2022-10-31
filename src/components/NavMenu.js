import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from 'react-router-dom';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Grid,
    Text,
    Flex,
    Image,
    Box, VStack
} from '@chakra-ui/react'



const NavMenu = () => {

    const {isMenuOpen, closeMenu}= useContext(ShopContext)

    return (
        <Drawer isOpen={isMenuOpen} onClose={closeMenu} placement="left" size="sm">
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <VStack p="2rem">
                            <Link to="/">Homepage</Link>
                            <Link to="/">About</Link>
                            <Link to="/">Contact</Link>
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Text w="100%">Copyright Headless Santi</Text>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}

export default NavMenu