import React, { Component } from 'react'
import Client from 'shopify-buy';

const ShopContext = React.createContext();

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
});

export class ShopProvider extends Component {

    state = {
        product : {},
        products: [],
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false
    }
    
    createCheckout = async () => {

    }

    fetchCheckout = async () => {

    }

    addItemtoCheckout = async () => {
        
    }

    removeLineItem = async (lineItemIdsToRemove) => {

    }

    fetchAllProducts = async () => {

    }

    fetchProductWithHandle = async (handle) => {

    }

    closeCart = () => {}

    opentCart = () => {}
    
    closeMenu = () => {}
    
    openMenu = () => {}

    render() {
    return (
        <ShopContext.Provider>
            {this.props.children}
        </ShopContext.Provider>
    )
    }
}

const ShoConsumer = ShopContext.Consumer

export {ShoConsumer, ShopContext}

export default ShopProvider
