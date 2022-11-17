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
        planAdded: false,
        planToAdd: {},
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

    fetchCheckout = (checkoutId) => {
        // Fetches checkout
        client.checkout
            .fetch(checkoutId)
            .then((checkout) => {
                // Saves checkout in state
                this.setState({ checkout: checkout })
            });
    };

    removeLineItem = async (lineItemIdsToRemove) => {
        // Remove an item from the checkout
        const checkout = await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove)
        this.setState({ checkout: checkout })
    };

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

    addExtendPlanToCart = async () => {
        this.setState({planAdded : false})
        const component = Extend.buttons.instance(".extend-offer");
        const plan = component.getPlanSelection();
        // component.getActiveProduct() - If the Extend warranty offers are rendering, this should be the product the warranty offer is rendering for
        const product = component.getActiveProduct();
        if (plan) {
            this.setState({planAdded : true})
            const planPriceDollar = plan.price / 100
            const warrantyHandle = `extend-protection-plans-${planPriceDollar <= 49.99 ? '1' : planPriceDollar <= 4999.00 ? '2' : '3' }`
            const extendProducts = await client.product.fetchByHandle(warrantyHandle);
            let planData = {}
            await extendProducts.variants.forEach(variant => {
                const skuPrice = variant.sku.replace("Extend-Protection-Plan-", "")
                if (skuPrice == planPriceDollar) {
                    const extendBool = true
                     planData  = {
                        variantId: variant.id,
                            quantity: 1,
                            customAttributes: [
                            {key: "Extend.IsExtendWarranty", value: "true"},
                            {key: "Product", value: product.name},
                            {key: "Term", value: `${plan.term / 12} years`},
                            {key: "_Extend.IsPricePoint", value: "true"},
                            {key: "_Extend.PlanId", value: plan.planId},
                            {key: "_Extend.ProductId", value: product.id},
                        ]
                    }
                }
            })
            const lineItemsToAdd = [
                planData
            ]

            await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd);
        }
    }

    addItemtoCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
            {
                variantId,
                quantity: parseInt(quantity, 10)
            }
        ]

        await this.addExtendPlanToCart()
        const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd);
        await this.setState({ checkout: checkout })
        await this.openCart()

    };


    closeCart = () => { this.setState({ isCartOpen: false }) };

    openCart = () => { this.setState({ isCartOpen: true }) };

    closeMenu = () => { this.setState({ isMenuOpen: false }) };

    openMenu = () => { this.setState({ isMenuOpen: true }) };

    render() {

        return (
            <ShopContext.Provider
                // Allows all functions to be called from other components 
                value={{
                    ...this.state,
                    fetchAllProducts: this.fetchAllProducts,
                    fetchProductWithHandle: this.fetchProductWithHandle,
                    addItemToCheckout: this.addItemtoCheckout,
                    addExtendPlanToCart: this.addExtendPlanToCart,
                    removeLineItem: this.removeLineItem,
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    closeMenu: this.closeMenu,
                    openMenu: this.openMenu
                }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
