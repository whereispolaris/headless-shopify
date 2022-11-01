import React, { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

const ExtendOffers = () => {

    const [variantId, setvariantId] = useState();

    // Grabs the path from the URL
    const { handle } = useParams();

    const fetchProductVariant = async (handle) => {

        // Fetch a single product by Handle
        const product = await client.product.fetchByHandle(handle);

        // get the product ID
        const productId = product.variants[0].id

        // Todo : If product.variants > 1 add event listener to check for option changes

        // get the product variant
        setvariantId( productId.replace("gid://shopify/ProductVariant/", "") )

        const extendDiv = document.querySelector('.extend-offer')
        const component = Extend.buttons.instance('.extend-offer')

        if (extendDiv && !component) {
            if(variantId) Extend.buttons.render(extendDiv, {referenceId : variantId})
        }
        else {
            component.setActiveProduct(variantId)
        }

    };

    // Fetches products with handle and listens for changes
    useLayoutEffect(() => {
        fetchProductVariant(handle)
    }, [fetchProductVariant, variantId]);

    return (
        <>
        <div className="extend-offer"></div>
        </>

    )

}

export default ExtendOffers