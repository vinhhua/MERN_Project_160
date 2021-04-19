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
                    <NavLink to="/register" activeStyle>
                        Sign Up
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
