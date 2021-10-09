import React from 'react'
const CartColumns = () => {
    return (
        <div className="container-fluid text-center d-none d-lg-block my-5">
            <div className="row">
                <div className="col-lg-2">
                    <p className="text-uppercase">Products</p>
                </div>
                <div className="col-lg-2">
                    <p className="text-uppercase">Name of product</p>
                </div>
                <div className="col-lg-2">
                    <p className="text-uppercase">Price</p>
                </div>
                <div className="col-lg-2">
                    <p className="text-uppercase">Quantity</p>
                </div>
                <div className="col-lg-2">
                    <p className="text-uppercase">remove</p>
                </div>
                <div className="col-lg-2">
                    <p className="text-uppercase">total</p>
                </div>
            </div>    
        </div>
    )
}

export default CartColumns
