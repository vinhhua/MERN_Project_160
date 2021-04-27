import React from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>Logo</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        <h1>About</h1>
                    </NavLink>
                    <NavLink to="/services" activeStyle>
                        <h1>Services</h1>
                    </NavLink>
                    <NavLink to="/contact-us" activeStyle>
                        <h1>Contact Us</h1>
                    </NavLink>
                    <NavLink to="/spending" activeStyle>
                        <h1>Spending</h1>
                    </NavLink>
                    <NavLink to="/register" activeStyle>
                        <h1>Sign Up</h1>
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar
