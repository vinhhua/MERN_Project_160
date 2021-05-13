import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import { IconButton, CssBaseline } from '@material-ui/core';
import bg_video from '../videos/bg-video.mp4';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import '../../styles/LandingPage.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

//  override background functionality for Menu
const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: "#008b8b"
        }
      }
    }
  }
})


export const LandingPage = () => {

  //  visibility useStates: default false
  const [showNav, setNav] = useState(false);        //  nav   
  const [wait, setWait] = useState(false);

  //  first render
  useEffect(() => {
    setWait(true);
  }, [])
  
  return (
      <div>
        <video mute="true" loop autoPlay> 
            <source src={bg_video} type="video/mp4"/>
        </video>
        <CssBaseline/>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <Navbar show={showNav}/>

          <MuiThemeProvider theme={theme}>
          <IconButton onClick={() => setNav(!showNav)}> 
              <MenuRoundedIcon style={{ color: "white", backgroundColor: "black", fontSize:'50px' }}/> 
          </IconButton>
          </MuiThemeProvider>

          <div className={ wait ? "pause active" : "pause"}>
            <h1> Welcome to 
                <span style={{ color: '#008b8b', marginLeft: '15px' }}> 
                    Tracker360
                </span>
            </h1>

            <p className="h1-tag"> Your <span style={{ color: '#008b8b', marginLeft: '6px', marginRight: '6px' }}> data </span> 
            to track. Whenever and wherever. </p>

          
            <span className="dashboard">
              <li><Link to="/register"> Register </Link></li>
              <li><Link to="/login"> Login </Link></li>
            </span>

          </div>
        </motion.div>
          
    </div>
  )
}
