import React, { useState } from 'react'
import Navbar from '../Navbar';
import { IconButton, Button, CssBaseline } from '@material-ui/core';
import bg_video from '../videos/bg-video.mp4';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import '../../styles/LandingPage.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
  
  return (
      <>
        <CssBaseline/>
        <video mute="true" loop autoPlay> 
            <source src={bg_video} type="video/mp4"/>
        </video>

        <Navbar show={showNav}/>

        <MuiThemeProvider theme={theme}>
        <IconButton onClick={() => setNav(!showNav)}> 
            <MenuRoundedIcon style={{ color: "white", backgroundColor: "black", fontSize:'50px' }}/> 
        </IconButton>
        </MuiThemeProvider>


        <h1> Welcome to 
            <span style={{ color: '#008b8b', marginLeft: '15px' }}> 
                Tracker360
            </span>
        </h1>

        <p className="h1-tag"> Your <span style={{ color: '#008b8b', marginLeft: '6px', marginRight: '6px' }}> data </span> 
        to track. Whenever and wherever. </p>

        <div className="button">
        <Button color="secondary" variant="contained" href="/register">
            REGISTER
        </Button>
        <Button color="primary" variant="contained" href="/login">
            LOG-IN
        </Button>
        </div>
          
      </>
  )
}
