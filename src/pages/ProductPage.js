import React, { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'

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
        <div>
            <h1>{product.title}</h1>
        </div>
    )
}

export default ProductPage
