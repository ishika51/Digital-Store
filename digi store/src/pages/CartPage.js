import React from 'react'
import Cart from '../components/CartPage/Cart';
import Hero from '../components/Hero';
import cartBcg from '../images/storeBcg.jpeg';


const CartPage = () => {
    return (
        <div>
            <Hero img={cartBcg} />
            <Cart />
        </div>
    )
}

export default CartPage