import React from 'react'
import CartItem from './CartItem';
import {ProductConsumer} from '../../context/context';

const CartList = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <ProductConsumer>
                        {value => {
                            const {cart, increment, decrement, removeItem } = value;
                            if (cart.length === 0){
                                return <h1 className="text-title text-center my-4">you cart is currently empty</h1>
                            }
                            return (
                                <React.Fragment>
                                    {cart.map(item => (
                                        <CartItem key={item.id} cartItem={item} increment={increment} decrement={decrement} removeItem={removeItem}/>
                                    ))}
                                </React.Fragment>
                            )
                        }}

                    </ProductConsumer>
                </div>
            </div>
        </div>
    )
}

export default CartList
