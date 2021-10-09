import React, { Component } from 'react'
import axios from 'axios';
import {linkData} from './linkData';
import {items} from './productData';

const ProductContext = React.createContext();

export class ProductProvider extends Component {

    state = {
        sideBarOpen: false,
        cartOpen: false,
        links: linkData,
        cart: [],
        cartItems: 0,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},
        loading: true,
        search: '',
        price: 0,
        min: 0,
        max: 0,
        company: 'all',
        shipping: false
    }


    // componentDidMount() {
    //     axios.get('http://localhost:5000/products/')
    //       .then(response => {
    //         this.setState({ storeProducts: response.data })
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       })
    //   }
    componentDidMount(){
        this.setProducts(items);
    }

    handleSidebar = () => {
        console.log(this);
        this.setState({sideBarOpen: !this.state.sideBarOpen});
    }
    handleCart = () => {
        this.setState({cartOpen: !this.state.cartOpen});
    }
    closeCart = () => {
        this.setState({cartOpen: false});
    }
    openCart = () => {
        this.setState({cartOpen: true});
    }
    //get cart from storage
    getStorageCart = () => {
        let cart;
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }else{
            return [];
        }
        return cart;
    }
    //get product from local storage
    getStorageProduct = () => {
        return localStorage.getItem("singleProduct") ? JSON.parse(localStorage.getItem("singleProduct")) : {}; 
    }
    //get totals
    getTotals = () => {
        let subTotal = 0;
        let cartItems = 0;
        this.state.cart.forEach(item => {
            subTotal += item.total;
            cartItems += item.count;
        })
        subTotal = parseFloat(subTotal.toFixed(2));
        let tax = subTotal * 0.2;
        tax = parseFloat(tax.toFixed(2));
        let total = subTotal + tax;
        total = parseFloat(total.toFixed(2));
        return {
            cartItems,
            subTotal,
            tax,
            total
        }
    };

    //add totals
    addTotals = () => {
        const totals = this.getTotals();
        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTax: totals.tax,
            cartTotal: totals.total
        })
    };

    //sync storage
    syncStorage = () => {
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    };

    //add to cart
    addToCart = (id) => {
        console.log(`add to cart ${id}`);
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find(item => item.id === id);
        if (!tempItem){
            tempItem = tempProducts.find(item => item.id === id);
            let total = tempItem.price;
            let cartItem = {...tempItem, count: 1, total};
            tempCart = [...tempCart, cartItem];
        }else{
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
             tempItem.total = parseFloat(tempItem.total.toFixed(2));
        }
        this.setState(() => {
            return {cart: tempCart}
        }, () => {
            this.addTotals();
            this.syncStorage();
            this.openCart();
        })

    }
    //set single product
    setSingleProduct = (id) => {
        console.log(`set single product ${id}`);
        let product = this.state.storeProducts.find(item => item.id === id);
        localStorage.setItem('singleProduct', JSON.stringify(product));
        this.setState({
            singleProduct: {...product},
            loading: false,
        });

    }

    
    setProducts = (products) => {
        let storeProducts = products.map(item => {
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
            const product = {id, ...item.fields, image};
            return product;
        })
         //featured products
        let featuredProducts = storeProducts.filter(item => item.featured === true);

        //get max price
        let maxPrice = Math.max(...storeProducts.map(item => item.price));

        this.setState({
            storeProducts,
            filteredProducts: storeProducts,
            featuredProducts,
            cart: this.getStorageCart(),
            singleProduct: this.getStorageProduct(),
            loading: false,
            price: maxPrice,
            max: maxPrice,

        }, () => {
            this.addTotals()
        });
    } 
   
    //cart functionality
    //increment
    increment = (id) => {
        // console.log(id);
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        cartItem.count += 1;
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(() => {
            return {
                cart: [...tempCart],
            }
        }, () => {
            this.addTotals();
            this.syncStorage();
        })

    }
    //decrement
    decrement = (id) => {
        // console.log(id);
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);

        cartItem.count -= 1;
        if (cartItem.count === 0){
            this.removeItem(id);
        }else{
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(() => {
            return {
                cart: [...tempCart],
            }
        }, () => {
            this.addTotals();
            this.syncStorage();
        })}
    }
    //removeItem
    removeItem = (id) => {
        // console.log(id);
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        this.setState({
            cart: [...tempCart]
        },() => {
            this.addTotals();
            this.syncStorage();
        })
    }
    //clearCart
    clearCart = () => {
        this.setState({
            cart: []
        },() => {
            this.addTotals();
            this.syncStorage();
        })
    }

    // handle filtering
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        // console.log(`name: ${name} value: ${value}`)
        this.setState({
            [name]: value
        }, this.sortData)
    }
    sortData = () => {
        const {storeProducts, price, company, shipping, search} = this.state;
        let tempProducts = [...storeProducts];
        let tempPrice = parseInt(price);
        //filter by price
        tempProducts = tempProducts.filter(elem => elem.price <= tempPrice);

        //filter by company
        if (company !== 'all'){
            tempProducts = tempProducts.filter(item => item.company === company);
        } 
        //filter by free shipping
        if (shipping){
              tempProducts = tempProducts.filter(item => item.freeShipping === true);
        }
        //filter by search
        if (search.length > 0){
            tempProducts = tempProducts.filter(item => {
                let tempSearch = search.toLowerCase();
                let tempTitle = item.title.toLowerCase().slice(0, search.length);
                if (tempSearch === tempTitle){
                    return item;
                }
                //in case no match
                return null;
            })
        }
        this.setState({filteredProducts: tempProducts});
    }



    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, 
                handleSidebar: this.handleSidebar,
                handleCart: this.handleCart,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addToCart: this.addToCart,
                setSingleProduct: this.setSingleProduct,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

export const  ProductConsumer = ProductContext.Consumer;
