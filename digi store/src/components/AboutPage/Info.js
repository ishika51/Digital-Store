import React from 'react'
import Title from '../Title';
import aboutBcg from '../../images/aboutBcg.jpeg';
import { Link } from 'react-router-dom';
const Info = () => {
    return (
        <section className="py-5">
        <div className="container">
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <img src={aboutBcg} alt="about" className="img-fluid img-thumbnail" style={{background: 'var(--darkGrey)'}}/>
                </div>
                <div className="col-10 mx-auto col-md-6 my-3">
                    <Title title="about us" />
                    <p className="text-lead text-muted my-3" >Digistore is a web application that serves you the latest tech products ranging from laptops, smartphones to high tech cameras. Stay connected to find jaw dropping deals.</p>
                        <Link to='/products' className="main-link">our products </Link>
                </div>
            </div>
        </div>
        </section>
    )
}

export default Info