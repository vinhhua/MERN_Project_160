import { useState, useEffect } from "react";
import axios from "axios";
import '../../styles/LoggedInForm.css';
import bg_video from '../videos/bg-video.mp4';

//  importing links, routes, and forms
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

//  event icons
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';


//  spinner
import { FingerprintSpinner } from 'react-epic-spinners';

const LoggedInForm = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);   //  default logged state false

  //  clear local storage and push to home page
  const logOutHandler = () => {
    setLoggedOut(true);    
    setTimeout(() => {
      localStorage.clear();
      history.push('/');
      setLoggedOut(false);
    }, 1500);   //  seconds
  }

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken")).token}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized, please login");
      }
    };

    fetchPrivateDate();
  }, []);



  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      { loggedOut ? 
      <div className="loading-screen" style={{ color: "white" }}>
        <h1>Come back soon!</h1>
        <FingerprintSpinner color={"#36D7B7"} size={250}/>
      </div>
      : 
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ opacity: 0.5 }}>
        <video mute="true" loop autoPlay> 
          <source src={bg_video} type="video/mp4"/>
        </video>
        <ul className="logout">
          <button className="logout" onClick={logOutHandler}> Log Out </button>
        </ul>
        <span className="dashboard" id="hov">
          <li><Link to="/spending"> Track Spending <LocalAtmIcon style={{ fontSize: "1.25em" }}/></Link></li>
          <li><Link to="/todo"> Task Management <EventNoteIcon style={{ fontSize: "1.25em" }}/></Link></li>
          <li><Link to="/exercises"> Track Exercises <DirectionsRunIcon style={{ fontSize: "1.25em" }}/></Link></li>
        </span>
      </motion.div>}
    </>
    
  );
};

export default LoggedInForm;