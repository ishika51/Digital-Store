import React from 'react';
import {ProductConsumer} from '../context/context';
import styled from 'styled-components';
import {Link } from 'react-router-dom';

const SideCart = () => {
    return (
        <ProductConsumer>
            {(value) => {
                const {cartOpen, closeCart, cart, cartTotal} = value; 
                return (
                    <CartWrapper show={cartOpen} onClick={closeCart}>
                        <ul>
                            {cart.map(item => {
                                return (
                                    <li key={item.id} className="cart-item mb-4">
                                        <div className="container d-flex flex-row mt-3">
                                            <img src={`../${item.image}`} alt="cart" width="100"/>
                                            <div className="mt-3  mx-1">
                                                <h6 className="text-uppercase">{item.title}</h6>
                                                <div className="text-title text-capitalize">amount: {item.count}</div>
                                            </div>
                                        </div>
                                        <hr/>   
                                    </li>
                                )
                            })}
                        </ul>
                        <h4 className="text-capitalize text-main">
                            cart total: Rs{cartTotal.toFixed(2)}
                        </h4>
                        <div className="text-center my-5">
                            <Link to="/cart" className="main-link">cart page</Link>
                        </div>

                        
                    </CartWrapper>
                )
            }}
        </ProductConsumer>
    )
}

export default SideCart


const CartWrapper = styled.div`

position: fixed;
top: 60px;
right: 0;
width: 100%;
height: 100%;
background: var(--mainGrey);
z-index: 1;
border-left: 4px solid var(--primaryColor);
transition: var(--mainTransition);
transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};

@media (min-width: 576px){
    width: 20rem;
}

overflow: scroll;
padding: 2rem;
ul{
    padding: 0 !important;
}
.cart-item{
    list-style-type: none;
}
`;