import React from 'react'
import styled from 'styled-components';
import {ProductConsumer} from '../context/context';


const Footer = () => {
    return (
        <ProductConsumer>
            {(value) => {

                return (
                    <FooterWrapper>
                        {/* <div className="container py-3 d-flex justify-content-row">
                            <div className="col-md-6">
                                <p className="text-capitalize">copyright &copy; tech store {new Date().getFullYear()}. all rights reserved{' '}</p>
                            </div>
                            <div className="col-md-6 d-flex justify-content-around">
                                {value.socialIcons.map(elem => {
                                    return <a href={elem.url} key={elem.id} target="_blank" rel="noopener noreferrer">{elem.icon}</a>
                                })}
                            </div>
                        </div> */}
                    </FooterWrapper>
                )
            }}
        </ProductConsumer>
    )
}

export default Footer;

const FooterWrapper = styled.footer`

background: var(--darkGrey);
color: var(--mainWhite);

.icon {
    font-size: 1.5rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
}
.icon:hover{
    color: var(--primaryColor);
    cursor: pointer;
}

`;