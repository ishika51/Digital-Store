import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import Default from './pages/Default';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SideCart from './components/SideCart';
import Sidebar from './components/Sidebar';


class App extends Component {
  render() {
    return (
      <React.Fragment>

        <Navbar />
        <Sidebar />
        <SideCart />

        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/about' component={AboutPage}/>
          <Route exact path='/cart' component={CartPage}/>
          <Route exact path='/contact' component={ContactPage}/>
          <Route exact path='/products' component={ProductsPage}/>
          <Route exact path='/products/:id' component={SingleProductPage}/>
          <Route  component={Default}/>
        </Switch>
        <Footer />

      </React.Fragment>
    )
  }
}

export default App;