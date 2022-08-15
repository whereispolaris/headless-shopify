import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'

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
        <div>
            {
                products.map(product => (
                    <Link to={`/products/${product.handle}`} key={product.title}>{product.title}</Link>
                ))
            }
        </div>
    )
}

export default Home
