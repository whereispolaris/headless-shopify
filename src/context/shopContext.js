import React, { Component } from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

export class ShopProvider extends Component {
    state = {
        product: {},
        products: [],
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false,
    };

    // Get the checkout when the app loads
    componentDidMount() {
        // get checkout
        if (localStorage.checkout_id) {
            this.fetchCheckout(localStorage.checkout_id);
        }
        else {
            this.createCheckout();
        }
    }

    createCheckout = async () => {
        // Create an empty checkout
        const checkout = await client.checkout.create();
        // Store checkout ID in local storage
        localStorage.setItem("checkout_id", checkout.id);
        // Update checkout state
        this.setState({ checkout: checkout });
    };

    fetchCheckout = async (checkoutId) => {
        // Fetches checkout
        client.checkout
            .fetch(checkoutId)
            .then((checkout) => {
                // Saves checkout in state
                this.setState({ checkout: checkout })
            });
    };

    addItemtoCheckout = async () => { };

    removeLineItem = async (lineItemIdsToRemove) => { };

    fetchAllProducts = async () => {
        // Fetch all products in your shop
        const products = await client.product.fetchAll();
        // Update products state
        this.setState({ products: products });
    };

    fetchProductWithHandle = async (handle) => {
        // Fetch a single product by Handle
        const product = await client.product.fetchByHandle(handle);
        // Update product state
        this.setState({ product: product });
    };

    closeCart = () => { };

    openCart = () => { };

    closeMenu = () => { };

    openMenu = () => { };

    render() {
        console.log(this.state.checkout);

        return <ShopContext.Provider>{this.props.children}</ShopContext.Provider>;
    }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
