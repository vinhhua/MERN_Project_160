import React from 'react'
import Navbar from '../Navbar'

import { makeStyles } from '@material-ui/core/styles';
import '../../styles/LandingPage.css';
import bg_video from '../videos/bg-video.mp4';


const useStyles = makeStyles((theme) => ({
    video: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '-1',
    },
}))

export const LandingPage = () => {
    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <video className={classes.video} mute loop autoPlay> 
                <source src={bg_video} type="video/mp4"/>
            </video>
            <h1 className="h1">Welcome to <span style={{ color: '#ff7961', marginLeft: '10px' }}> Tracker360.</span></h1>
            <p className="p">Your data to track. Whenever and wherever.</p>
        </div>
    )
}
