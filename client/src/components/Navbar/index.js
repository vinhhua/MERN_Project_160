import React, { useState, useEffect } from 'react'
// import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import '../../styles/LandingPage.css';
import { Link } from 'react-router-dom';
  
const Navbar = ({show}) => {
    /*
    const [loggedOut, setLoggedOut] = useState(false)
    const logout = () => {
        localStorage.clear();
        setLoggedOut(true);
    }
    */

    //  visibility useCases = default false
    const [showAbout, setAbout] = useState(false);    //  about
    const [showService, setService] = useState(false);    //  service
    const [showContact, setContact] = useState(false);    //  contact

    useEffect(() => {
        if(show) {
            setAbout(false);
            setService(false);
            setContact(false);
        }
      }, [show])

    return (
        <div className={ show ? "sidenav active" : "sidenav" }>
            <ul>
                <li> <Link style={{color: "white"}}to="/dashboard"> PROFILE</Link></li>
                <li> <a onClick={() => setAbout(!showAbout)}> ABOUT </a> </li>
                <p className={showAbout ? "p-tab active" : "p-tab"}> Our application allows 
                Users to conveniently keep track of their tasks. Make a secure account, 
                log in, and begin tracking your essentials! </p>
                <li> <a onClick={() => setService(!showService)}> SERVICES </a> </li>
                <p className={showService ? "p-tab active" : "p-tab"}> 
                    <li><Link style={{color:"white"}} to="/spending">Spending</Link></li>
                    <li><Link style={{color:"white"}} to="/todo">To Do</Link></li></p>
                <li> <a onClick={() => setContact(!showContact)}> CONTACT US </a> </li>
                <p className={showContact ? "p-tab active" : "p-tab"}> Let us know about your opinions!
                Contact us at 
                <span style={{ color: '#008b8b', marginLeft: '10px', marginRight: '10px'}}> 
                    cs160team11@sjsu.edu </span>
                for any inquiries.
                </p>
            </ul>
        </div>
    )
    
}

export default Navbar;