import React from 'react'
import { useState } from 'react'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';
  
const Navbar = () => {
    const [loggedOut, setLoggedOut] = useState(false)
    const logout = () => {
        localStorage.clear();
        setLoggedOut(true);
    }
    if (loggedOut) {
        return (
            <>
                <Nav>
                    <NavLink to="/">
                        <h1>Logo</h1>
                    </NavLink>
                    <Bars />
                    <NavMenu>
                        <NavLink to="/about">
                            <h1>About</h1>
                        </NavLink>
                        <NavLink to="/services">
                            <h1>Services</h1>
                        </NavLink>
                        <NavLink to="/contact-us">
                            <h1>Contact Us</h1>
                        </NavLink>
                        <NavLink to="/spending">
                            <h1>Spending</h1>
                        </NavLink>
                        <NavLink to="/register">
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
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>Logo</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/about">
                        <h1>About</h1>
                    </NavLink>
                    <NavLink to="/services">
                        <h1>Services</h1>
                    </NavLink>
                    <NavLink to="/contact-us">
                        <h1>Contact Us</h1>
                    </NavLink>
                    <NavLink to="/spending">
                        <h1>Spending</h1>
                    </NavLink>
                    <NavLink to="/register">
                        <h1>Sign Up</h1>
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <button style={{
                        backgroundColor: "#256ce1",
                        padding: "10px 22px",
                        outline: "none",
                        border: "none",
                        color: "#fff",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        textDecoration: "none"
                    }}
                    onClick={logout}>Sign Out</button>
                </NavBtn>
            </Nav>
        </>
    )
}

export default Navbar
